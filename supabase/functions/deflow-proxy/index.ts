import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { path, method = 'POST', data } = await req.json()

    const apiKey = Deno.env.get('DEFLOW_API_KEY')
    const apiSecret = Deno.env.get('DEFLOW_API_SECRET')
    const passphrase = Deno.env.get('DEFLOW_API_PASSPHRASE')

    if (!apiKey || !apiSecret || !passphrase) {
      console.error('Missing Deflow credentials in environment')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const baseUrl = 'https://api.deflow.exchange'
    let normalizedPath = path.startsWith('/') ? path : `/${path}`
    if (!normalizedPath.startsWith('/v1/')) {
      normalizedPath = `/v1${normalizedPath}`
    }
    
    const fullUrl = `${baseUrl}${normalizedPath}`
    const idempotencyKey = crypto.randomUUID()

    console.log(`Proxying ${method} request to Deflow: ${fullUrl}`)

    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-DF-Secret': apiSecret,
        'X-DF-Passphrase': passphrase,
        'X-DF-Idempotency-Key': idempotencyKey,
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    })

    const responseData = await response.json()
    
    return new Response(
      JSON.stringify(responseData),
      { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
