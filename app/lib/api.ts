const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const API_BASE = "/applicants";

// ------------------- FETCH WITH AUTO-REFRESH -------------------

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  retry = true
): Promise<any> {
  const formattedUrl = url.startsWith("/") ? url : `/${url}`;
  const fullUrl = `${API_URL}${formattedUrl}`;

  try {
    const response = await fetch(fullUrl, {
      ...options,
      credentials: "include", // always send cookies
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    // No Content
    if (response.status === 204) return null;

    // Handle unauthorized → try refresh once
    if (response.status === 401 && retry) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return fetchWithAuth(url, options, false); // retry ONE TIME
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail ||
          JSON.stringify(errorData) ||
          `Request failed with status ${response.status}`
      );
    }

    return response.json();
  } catch (error: any) {
    console.log(`[API ERROR] ${options.method || "GET"} ${fullUrl}:`, error);
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      throw new Error(
        `Network error: Could not connect to API at ${API_URL}. ` +
          `Check server, CORS, or URL.`
      );
    }
    throw error;
  }
}

// ------------------- REFRESH ACCESS TOKEN -------------------

export async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/refresh/`, {
      method: "POST",
      credentials: "include", // send refresh cookie automatically
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.warn("Token refresh failed:", response.status);
      return false;
    }

    console.log("Token refreshed successfully!");
    return true;
  } catch (error) {
    console.log("Error refreshing token:", error);
    return false;
  }
}

// ------------------- OPTIONAL: CHECK AUTH -------------------

export async function checkAuth(): Promise<{
  is_authenticated: boolean;
  user: any;
}> {
  return fetchWithAuth("/check_admin_auth/");
}
