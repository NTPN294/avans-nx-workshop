import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TokenService {
    constructor() {
        console.log('TokenService created');
    }

    getCookie(name: string): string | null {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find((row) => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }
    
    parseJwt(token: string): Record<string, unknown> | null {
        try {
            // JWT format: <header>.<payload>.<signature>
            const base64Payload = token.split('.')[1]; // Extract the payload part
            const decodedPayload = atob(base64Payload); // Decode from Base64
            return JSON.parse(decodedPayload); // Parse the JSON string to an object
        } catch (error) {
            console.error("Invalid JWT Token", error);
            return null;
        }
    }
    
    isJwtExpired(exp: number): boolean {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return exp < currentTime;
    }

    deleteAllCookies(): void {
        const cookies = document.cookie.split(";");
      
        for (const cookie of cookies) {
          const [name] = cookie.split("=");
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      }
}


