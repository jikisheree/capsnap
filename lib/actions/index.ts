"use server";

import { createSupbaseServerClientReadOnly } from "../supabase/supabase-server";

export default async function readUserSession(){
    
    const supabase = await createSupbaseServerClientReadOnly()

    return supabase.auth.getUser();
}