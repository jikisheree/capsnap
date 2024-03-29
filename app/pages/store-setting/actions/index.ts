"use server";

import readUserSession from "@/lib/actions";
import { createSupabaseAdmin, createSupabaseServerClient } from "@/lib/supabase/supabase-server";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createMember(data: { email: string; password: string; first_name: string; last_name: string; username: string; role: string; }) {

    const { data: userSession } = await readUserSession();

    if (userSession.user?.user_metadata.role !== "Super Admin") {
        console.log(userSession.user?.user_metadata.role);
        return JSON.stringify({ error: { message: "You are not allowed to take this action." } });
    }

    const supabase = await createSupabaseAdmin()
    // create account
    const createResult = await supabase.auth.admin.createUser({
        email: data.email, password: data.password, email_confirm: true, user_metadata: {
            role: data.role,
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name
        }
    })

    if (createResult.error?.message) { return JSON.stringify(createResult) } else {
        const memberResult = await supabase.from("admin").insert({ first_name: data.first_name, last_name: data.last_name, username: data.username, id: createResult.data.user?.id, email: data.email })
        if (memberResult.error?.message) { return JSON.stringify(memberResult) }
        else {
            const permissionResult = await supabase.from("permission").insert({ role: data.role, admin_id: createResult.data.user?.id })
            return JSON.stringify(permissionResult);
        }
    }
}

export async function readMember() {
    // unstable_noStore();

    const supabase = await createSupabaseServerClient();

    return await supabase.from("permission").select("*, admin(*)")
}

export async function readStoreData() {
    // unstable_noStore();

    const supabase = await createSupabaseServerClient();

    return await supabase.from("store_data").select("*").single();
}

export async function deleteMemberById(user_id: string) {
    console.log(user_id)


    // admin only
    const { data: userSession } = await readUserSession();

    if (userSession.user?.user_metadata.role !== "Super Admin") {
        return JSON.stringify({ error: { message: "You are not allowed to take this action." } });
    }

    const supabaseAdmin = await createSupabaseAdmin()

    const deleteResult = await supabaseAdmin.auth.admin.deleteUser(user_id);

    if (deleteResult.error?.message) { return JSON.stringify(deleteResult) } else {
        const supabase = await createSupabaseServerClient();
        const result = await supabase.from("admin").delete().eq("id", user_id);
        return JSON.stringify(result);
    }
}


export async function updateMemberBasicById(user_id: string, data: { first_name: string; last_name: string; }) {

    const supabaseAdmin = await createSupabaseAdmin()
    const updateResult = await supabaseAdmin.auth.admin.updateUserById(user_id, {
        user_metadata: data
    });

    if (updateResult.error?.message) { return JSON.stringify(updateResult) }
    else {
        const supabase = await createSupabaseServerClient();
        const result = await supabase.from("admin").update(data).eq("id", user_id);
        return JSON.stringify(result);
    }

}

export async function updateMemberAccountById(user_id: string, data: { username: string; email: string; password: string | undefined; }) {


    let updateObject: { username: string; email: string; password?: string | undefined; } = { username: data.username, email: data.email };

    if (data.password) {
        updateObject["password"] = data.password;
    }

    const supabaseAdmin = await createSupabaseAdmin()
    const updateResult = await supabaseAdmin.auth.admin.updateUserById(user_id, updateObject);

    if (updateResult.error?.message) { return JSON.stringify(updateResult) }
    else {
        const supabase = await createSupabaseServerClient();
        const result = await supabase.from("admin").update({ username: data.username, email: data.email }).eq("id", user_id);
        return JSON.stringify(result);
    }

}

export async function updateMemberAdvanceById(permission_id: string, user_id: string, data: { role: "Admin" | "Super Admin", status: "Active" | "Resigned" }) {

    // admin only
    const { data: userSession } = await readUserSession();

    if (userSession.user?.user_metadata.role !== "Super Admin") {
        return JSON.stringify({ error: { message: "You are not allowed to take this action." } });
    }

    console.log("Advance", data.role);

    const supabaseAdmin = await createSupabaseAdmin()
    // create account
    const updateResult = await supabaseAdmin.auth.admin.updateUserById(user_id, {
        user_metadata: {
            role: data.role
        }
    });

    if (updateResult.error?.message) {
        return JSON.stringify(updateResult);
    } else {
        const supabase = await createSupabaseServerClient();
        const result = await supabase.from("permission").update(data).eq("id", permission_id);
        return JSON.stringify(result);
    }

}

export async function updateStoreData(data: { store_name: string, location: string, category: string }) {


    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("store_data").update(data).eq("id", 1);
    return JSON.stringify(result);


}