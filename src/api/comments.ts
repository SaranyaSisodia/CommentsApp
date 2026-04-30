export interface Comment {
  id: number;      
  postId: number;   
  name: string;     
  email: string;   
  body: string;     
}

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const PAGE_LIMIT = 10; 


export const fetchComments = async (page: number): Promise<Comment[]> => {
  const response = await fetch(
    `${BASE_URL}/comments?_page=${page}&_limit=${PAGE_LIMIT}`
  );

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data: Comment[] = await response.json();

  return data;
};

export { PAGE_LIMIT };