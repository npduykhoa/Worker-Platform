import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

// Custom fetch function with interceptor-like functionality
const customFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  // Request interceptor
  const modifiedInit = { ...init };
  const token = localStorage.getItem('token');
  if (token) {
    modifiedInit.headers = {
      ...modifiedInit.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(input, modifiedInit);

    // Response interceptor
    if (!response.ok) {
      switch (response.status) {
        case 401:
          console.error('Unauthorized access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        default:
          console.error('An error occurred:', response.statusText);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// Generic function to make API calls
async function fetchData<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  config?: RequestInit,
): Promise<T> {
  const baseUrl = 'https://reqres.in/api/';
  const fullUrl = `${baseUrl}${url}`;

  const fetchConfig: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
    ...config,
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    fetchConfig.body = JSON.stringify(data);
  }

  try {
    const response = await customFetch(fullUrl, fetchConfig);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Custom hook for GET requests
export function useGetData<T>(key: string, url: string, config?: RequestInit) {
  return useQuery<T, Error>({
    queryKey: [key, url, config],
    queryFn: () => fetchData<T>('GET', url, undefined, config),
  });
}

// Custom hook for POST requests
export function usePostData<T>() {
  return useMutation<T, Error, { url: string; data: any; config?: RequestInit }>({
    mutationFn: ({ url, data, config }: { url: string; data: any; config?: RequestInit }) =>
      fetchData<T>('POST', url, data, config),
  });
}

// Custom hook for PUT requests
export function usePutData<T>() {
  return useMutation<T, Error, { url: string; data: any; config?: RequestInit }>({
    mutationFn: ({ url, data, config }: { url: string; data: any; config?: RequestInit }) =>
      fetchData<T>('PUT', url, data, config),
  });
}

// Custom hook for DELETE requests
export function useDeleteData<T>() {
  return useMutation<T, Error, { url: string; config?: RequestInit }>({
    mutationFn: ({ url, config }: { url: string; config?: RequestInit }) =>
      fetchData<T>('DELETE', url, undefined, config),
  });
}

// Example usage
// export function ExampleComponent() {
//   const { data: getData, isLoading: isGetLoading, error: getError } = useGetData<any[]>('users', '/users');
//   const postData = usePostData<any>();
//   const putData = usePutData<any>();
//   const deleteData = useDeleteData<any>();

//   // Use the data and mutations as needed in your component
//   // ...
// }

// Configure React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
