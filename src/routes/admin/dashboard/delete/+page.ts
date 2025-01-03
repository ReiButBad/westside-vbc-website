import { env } from "$env/dynamic/public";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, url }) => {
    const name = url.searchParams.get("name")
    if(name === null) {
        return {
            entry: undefined
        }
    }
    const response = await fetch(`${env.PUBLIC_API_SERVER}/leaderboard/${name}`)
    if(!response.ok) return {entry: undefined}

    return {
        entry: await response.json()
    }
}