"use server";

import readUserSession from "@/lib/actions";
import { createSupabaseAdmin } from "@/lib/supabase/supabase-server";

export async function createMember(data: {email: string; password: string; name: string; role: "user"|"admin"; status: "active"|"resigned"; confirm: string;}) {

    const {data: userSession} = await readUserSession();

    if(userSession.user?.user_metadata.role !== "super admin"){
        return JSON.stringify({error:{messege: "You are not allowed to take this action."}});
    }
    
    const supabase = await createSupabaseAdmin()
    // create account
    const createResult = await supabase.auth.admin.createUser({email: data.email, password: data.password, email_confirm: true, user_metadata:{
        role: data.role
    }})

    if(createResult.error?.message){ return JSON.stringify(createResult)}else{
        const memberResult = await supabase.from("admin").insert({name: data.name, id:createResult.data.user?.id})
        if(memberResult.error?.message){ return JSON.stringify(memberResult)}
        else{
            const permissionResult = await supabase.from("permission").insert({role: data.role, admin_id:createResult.data.user?.id, status: data.status})
            return JSON.stringify(permissionResult);
        }
    }
    // create member

    // create permission
}