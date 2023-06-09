import axios from "axios";

export const BASE_URL = "https://www.tabnews.com.br/api/v1/";

export const get_content = async (
  page: number,
  token = "",
  strategy = "new"
) => {
  try {
    console.log(token)
    const response = await axios.post(
      BASE_URL + `contents?page=${page}&strategy=${strategy}`,
      {
        headers: {
          Cookie: `session_id=${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("err",error);
  }
};

export const get_content_user = async (
  page: number,
  strategy = "new",
  user: string
) => {
  try {
    const response = await axios.get(
      BASE_URL + `${user}?page=${page}&strategy=${strategy}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const get_content_slug = async (slug: string, user: string) => {
  try {
    const response = await axios.get(BASE_URL + `/contents/${user}/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const get_content_comment = async (slug: string, user: string) => {
  try {
    const response = await axios.get(
      BASE_URL + `/contents/${user}/${slug}/children`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
