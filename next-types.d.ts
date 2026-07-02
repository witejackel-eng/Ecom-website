// Workaround for Next.js 16 type resolution
// The auto-generated .next/dev/types/validator.ts imports these from
// "next/types.js", "next/server.js", etc. But Next.js 16.2.9 doesn't
// export types from those module paths without the .js extension.

declare module "next/types" {
  export type ResolvingMetadata = Promise<any>
  export type ResolvingViewport = Promise<any>
}

declare module "next/types.js" {
  export type ResolvingMetadata = Promise<any>
  export type ResolvingViewport = Promise<any>
}

declare module "next/server" {
  export class NextRequest extends Request {
    cookies: any
    nextUrl: URL
    ip: string
    geo: any
    json(): Promise<any>
  }
  export class NextResponse extends Response {
    static next(): NextResponse
    static json(body: any, init?: ResponseInit): NextResponse
    static redirect(url: string, status?: number): NextResponse
    static rewrite(url: string): NextResponse
    cookies: any
  }
}

declare module "next/server.js" {
  export type NextRequest = import("next/server").NextRequest
  export type NextResponse = import("next/server").NextResponse
}
