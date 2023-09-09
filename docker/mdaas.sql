CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


create table customers
(
    id        serial primary key,
    eid       uuid        not null unique,
    full_name varchar(50) not null
);

COMMENT ON TABLE customers is 'Tabela dos clientes Para manter o relacional mesmo com a tabela original estando em outro banco';
COMMENT ON COLUMN customers.id is 'Identificador do cliente';
COMMENT ON COLUMN customers.eid is 'Identificador externo do cliente';
COMMENT ON COLUMN customers.full_name is 'Nome completo do cliente';


create table sellers
(
    id        serial primary key,
    eid       uuid        not null unique,
    full_name varchar(50) not null
);

COMMENT ON TABLE sellers is 'Tabela dos vendedores Para manter o relacional mesmo com a tabela original estando em outro banco';
COMMENT ON COLUMN sellers.id is 'Identificador do vendedor';
COMMENT ON COLUMN sellers.eid is 'Identificador externo do vendedor';


create table if not exists assets_type
(
    id         int primary key,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null,
    name       varchar(50)             not null unique
);

COMMENT ON TABLE assets_type is 'Tabela dos tipos de assets';
COMMENT ON COLUMN assets_type.id is 'Identificador do tipo de asset';
COMMENT ON COLUMN assets_type.created_at is 'Data de criação do tipo de asset';
COMMENT ON COLUMN assets_type.updated_at is 'Data de atualização do tipo de asset';
COMMENT ON COLUMN assets_type.name is 'Nome do tipo de asset';
-- create all table below with syntax to postgresql 14
-- add createdAt timestamp column not null default new_timestamp
-- add updatedAt timestamp column not null default new_timestamp
-- add id uuid column primary key default unique uuid_generate_v4()
create table if not exists assets
(
    id         serial primary key,
    created_at timestamp default now()              not null,
    updated_at timestamp default now()              not null,
    eid        uuid      default uuid_generate_v4() not null unique,
    name       varchar(50)                          not null,
    url        varchar(255)                         not null,
    type       int                                  not null references assets_type (id)
);

COMMENT ON TABLE assets is 'Tabela dos assets';
COMMENT ON COLUMN assets.id is 'Identificador do asset';
COMMENT ON COLUMN assets.created_at is 'Data de criação do asset';
COMMENT ON COLUMN assets.updated_at is 'Data de atualização do asset';
COMMENT ON COLUMN assets.eid is 'Identificador externo do asset';
COMMENT ON COLUMN assets.name is 'Nome do asset';
COMMENT ON COLUMN assets.url is 'Url do asset';
COMMENT ON COLUMN assets.type is 'Tipo do asset';

create table if not exists product_categories
(
    id          serial primary key,
    created_at  timestamp default now()              not null,
    updated_at  timestamp default now()              not null,
    name        varchar(50)                          not null,
    description varchar(255)                         not null,
    eid         uuid      default uuid_generate_v4() not null unique
);

COMMENT ON TABLE product_categories is 'Tabela das categorias de produtos';
COMMENT ON COLUMN product_categories.id is 'Identificador da categoria de produto';
COMMENT ON COLUMN product_categories.created_at is 'Data de criação da categoria de produto';
COMMENT ON COLUMN product_categories.updated_at is 'Data de atualização da categoria de produto';
COMMENT ON COLUMN product_categories.name is 'Nome da categoria de produto';
COMMENT ON COLUMN product_categories.description is 'Descrição da categoria de produto';
COMMENT ON COLUMN product_categories.eid is 'Identificador externo da categoria de produto';

create table if not exists products
(
    id           serial primary key,
    created_at   timestamp default now()              not null,
    updated_at   timestamp default now()              not null,
    eid          uuid      default uuid_generate_v4() not null unique,
    name         varchar(50)                          not null,
    description  varchar(255)                         not null,
    category     int                                  not null references product_categories (id),
    seller_by_id int                               not null references sellers (id),
    price        float                                not null
);



COMMENT ON TABLE products is 'Tabela dos produtos';
COMMENT ON COLUMN products.id is 'Identificador do produto';
COMMENT ON COLUMN products.created_at is 'Data de criação do produto';
COMMENT ON COLUMN products.updated_at is 'Data de atualização do produto';
COMMENT ON COLUMN products.eid is 'Identificador externo do produto';
COMMENT ON COLUMN products.name is 'Nome do produto';
COMMENT ON COLUMN products.description is 'Descrição do produto';
COMMENT ON COLUMN products.category is 'Categoria do produto referencia a chave estrangeira para tabela product_category';
COMMENT ON COLUMN products.seller_by_id is 'Identificador do vendedor chave estrangeira';
COMMENT ON COLUMN products.price is 'Preço do produto';


-- Altera tabela assets para adicionar chave estrangeira para tabela products
ALTER TABLE assets
    ADD COLUMN productId bigint references products (id);
COMMENT ON COLUMN assets.productId is 'Identificador do produto do asset chave estrangeira';

create table coupon
(
    id           serial primary key,
    created_at   timestamp default now()              not null,
    updated_at   timestamp default now()              not null,
    eid          uuid      default uuid_generate_v4() not null unique,
    code         varchar(50)                          not null,
    discount     float                                not null,
    available_at timestamp                            not null,
    expires_at   timestamp                            not null,
    active       boolean                              not null,
    used_at      timestamp
);

COMMENT ON TABLE coupon is 'Tabela dos cupons';
COMMENT ON COLUMN coupon.id is 'Identificador do cupom';
COMMENT ON COLUMN coupon.created_at is 'Data de criação do cupom';
COMMENT ON COLUMN coupon.updated_at is 'Data de atualização do cupom';
COMMENT ON COLUMN coupon.eid is 'Identificador externo do cupom';
COMMENT ON COLUMN coupon.code is 'Código do cupom';
COMMENT ON COLUMN coupon.discount is 'Desconto do cupom';
COMMENT ON COLUMN coupon.available_at is 'Data de disponibilidade do cupom';
COMMENT ON COLUMN coupon.expires_at is 'Data de expiração do cupom';
COMMENT ON COLUMN coupon.active is 'Status do cupom';
COMMENT ON COLUMN coupon.used_at is 'Data de uso do cupom';

create table if not exists customers_reviews
(
    id          serial primary key,
    created_at  timestamp default now()              not null,
    updated_at  timestamp default now()              not null,
    eid         uuid      default uuid_generate_v4() not null unique,
    customer_id int                               not null references customers (id),
    product_id  int                               not null references products (id),
    rating      int                                  not null,
    comment     varchar(255)                         not null
);

COMMENT ON TABLE customers_reviews is 'Tabela das avaliações dos clientes';
COMMENT ON COLUMN customers_reviews.id is 'Identificador da avaliação do cliente';
COMMENT ON COLUMN customers_reviews.created_at is 'Data de criação da avaliação do cliente';
COMMENT ON COLUMN customers_reviews.updated_at is 'Data de atualização da avaliação do cliente';
COMMENT ON COLUMN customers_reviews.eid is 'Identificador externo da avaliação do cliente';
COMMENT ON COLUMN customers_reviews.customer_id is 'Identificador do cliente chave estrangeira';
COMMENT ON COLUMN customers_reviews.product_id is 'Identificador do produto chave estrangeira';
COMMENT ON COLUMN customers_reviews.rating is 'Avaliação do cliente numero de 0 a 100';
COMMENT ON COLUMN customers_reviews.comment is 'Comentário do cliente sobre o produto';


create table if not exists shopping_cart
(
    id                serial primary key,
    created_at        timestamp default now()              not null,
    updated_at        timestamp default now()              not null,
    eid               uuid      default uuid_generate_v4() not null unique,
    shopped_by_id     int                               not null references customers (id),
    products_quantity int                                  not null,
    products_price    float                                not null,
    total             float                                not null,
    coupon_id         int references coupon (id) unique
);

COMMENT ON TABLE shopping_cart is 'Tabela do carrinho de compras';
COMMENT ON COLUMN shopping_cart.id is 'Identificador do carrinho de compras';
COMMENT ON COLUMN shopping_cart.created_at is 'Data de criação do carrinho de compras';
COMMENT ON COLUMN shopping_cart.updated_at is 'Data de atualização do carrinho de compras';
COMMENT ON COLUMN shopping_cart.eid is 'Identificador externo do carrinho de compras';
COMMENT ON COLUMN shopping_cart.shopped_by_id is 'Identificador do cliente chave estrangeira';
COMMENT ON COLUMN shopping_cart.products_quantity is 'Quantidade de produtos no carrinho';
COMMENT ON COLUMN shopping_cart.products_price is 'Preço dos produtos no carrinho';
COMMENT ON COLUMN shopping_cart.total is 'Total do carrinho = preço dos produtos - desconto';
COMMENT ON COLUMN shopping_cart.coupon_id is 'Identificador do cupom chave estrangeira';

create table if not exists shopping_cart_products
(
    id               serial primary key,
    created_at       timestamp default now() not null,
    updated_at       timestamp default now() not null,
    shopping_cart_id int                  not null references shopping_cart (id),
    productId        int                  not null references products (id),
    quantity         int                     not null
);

COMMENT ON TABLE shopping_cart_products is 'Tabela dos produtos do carrinho de compras';
COMMENT ON COLUMN shopping_cart_products.id is 'Identificador do produto do carrinho de compras';
COMMENT ON COLUMN shopping_cart_products.created_at is 'Data de criação do produto do carrinho de compras';
COMMENT ON COLUMN shopping_cart_products.updated_at is 'Data de atualização do produto do carrinho de compras';
COMMENT ON COLUMN shopping_cart_products.shopping_cart_id is 'Identificador do carrinho de compras chave estrangeira';
COMMENT ON COLUMN shopping_cart_products.productId is 'Identificador do produto chave estrangeira';
COMMENT ON COLUMN shopping_cart_products.quantity is 'Quantidade do produto no carrinho de compras';
