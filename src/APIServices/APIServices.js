import { supabase } from "../supabaseClient";

export async function fetchProducts() {
  console.log("fetching");
  const { data: productsList, error } = await supabase
    .from("apple_products")
    .select("*");
  if (error) {
    throw new Error(error.message);
  }
  return productsList;
}
