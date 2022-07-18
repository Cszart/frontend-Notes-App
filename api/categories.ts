import axios from "axios";
import { CategoryI } from "../interfaces";

export const post_categories_create = async (data: CategoryI): Promise<any> => {
  const add_response = await axios.post<CategoryI>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    data
  );
  return add_response;
};

export const get_categories_all = async (): Promise<any> => {
  const all_categories_response = await axios.get<CategoryI[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/all`
  );

  const data = all_categories_response.data;
  return data;
};

export const get_categories_byID = async (id: string): Promise<any> => {
  const categories_byID_response = await axios.get<CategoryI>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
  );
  return categories_byID_response;
};

export const put_categories_update = async (data: CategoryI): Promise<any> => {
  const update_response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${data.id}`,
    data
  );
  return update_response;
};

export const delete_category = async (id: number): Promise<any> => {
  const categories_byID_response = await axios.delete<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
  );
  return categories_byID_response;
};
