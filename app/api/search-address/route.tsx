import { NextResponse } from "next/server";
const BASE_URL="https://api.mapbox.com/search/searchbox/v1/suggest"
export async function GET(request:any) {

    const {searchParams}=new URL(request.url);
    console.log("HI")
console.log(process.env.MAPBOX_ACCESS_TOKEN)
    const searchText=searchParams.get('q');
    const res=await fetch(BASE_URL+'?q='+searchText+'?language=en&limit=10&session_token=f06e7531-6373-4d5a-8614-b6f313488050'
    +"&access_token="+process.env.MAPBOX_ACCESS_TOKEN,
    {
        headers:{
            "Content-Type": "application/json"
        }
    })

    const searchResult=await res.json();
    return NextResponse.json(searchResult)

    //http://localhost:3000/api/search-address?q=Michigan%20Stadium
    
}