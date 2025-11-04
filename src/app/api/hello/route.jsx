import { NextResponse } from "next/server";
import ApiProxy from "../proxy";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";


export async function GET(request){
    const data = {
        apiEndpoint: DJANGO_API_ENDPOINT,
        timestamp: new Date().toISOString()
    }
    
    try {
        // Test Django connection
        const djangoResponse = await fetch(`${DJANGO_API_ENDPOINT}/waitlists/`)
        const djangoData = await djangoResponse.json()
        return NextResponse.json({
            ...data,
            djangoStatus: djangoResponse.status,
            djangoOk: djangoResponse.ok,
            djangoData
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            ...data,
            error: error.message,
            errorName: error.name,
            djangoStatus: 'connection failed'
        }, {status: 500})
    }
}
