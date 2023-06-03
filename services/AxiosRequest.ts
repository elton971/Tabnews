import axios from 'axios';

const BASE_URL = 'https://www.tabnews.com.br/api/v1/';

export const get_content = async (page: number, strategy = 'new') => {
  try {
    const response = await axios.get(
      BASE_URL + `contents?page=${page}&strategy=${strategy}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const get_content_user = async (page: number, strategy = 'new', user: string) => {
  try {
    const response = await axios.get(
      BASE_URL + `${user}?page=${page}&strategy=${strategy}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const get_content_slug = async (slug:string, user: string) => {
  try {
    const response = await axios.get(
      BASE_URL + `/contents/${user}/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
