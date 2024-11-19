import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return []; // Return an empty array if there's an error
  }

  return data || []; // Return data or an empty array if data is null
}

export async function createProduct(product: { name: string; price: number; image?: string; category: string; is_spicy?: boolean; is_vegetarian?: boolean }) {
  const { data, error } = await supabase
    .from('products')
    .insert([product]);

  if (error) {
    console.error('Error creating product:', error);
    return null;
  }
  return data;
}

export async function updateProduct(id: string, updates: { name?: string; price?: number; image?: string; category?: string; is_spicy?: boolean; is_vegetarian?: boolean }) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  return data;
}


export async function deleteProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return null;
  }
  return data;
}
