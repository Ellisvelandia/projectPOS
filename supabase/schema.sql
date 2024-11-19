
-- Create Categories table
create table categories (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Products table
create table products (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    price decimal(10,2) not null,
    image text,
    category text not null,
    is_spicy boolean default false,
    is_vegetarian boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Orders table
create table orders (
    id uuid default gen_random_uuid() primary key,
    total_amount decimal(10,2) not null,
    status text not null default 'completed',
    payment_method text default 'cash',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Order Items table
create table order_items (
    id uuid default gen_random_uuid() primary key,
    order_id uuid references orders(id),
    product_id uuid references products(id),
    quantity integer not null,
    price decimal(10,2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);