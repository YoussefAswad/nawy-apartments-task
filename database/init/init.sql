CREATE TYPE "public"."apartment_currency_enum" AS ENUM('USD', 'CAD', 'EUR', 'AED', 'AFN', 'ALL', 'AMD', 'ARS', 'AUD', 'AZN', 'BAM', 'BDT', 'BGN', 'BHD', 'BIF', 'BND', 'BOB', 'BRL', 'BWP', 'BYN', 'BZD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EEK', 'EGP', 'ERN', 'ETB', 'GBP', 'GEL', 'GHS', 'GNF', 'GTQ', 'HKD', 'HNL', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KHR', 'KMF', 'KRW', 'KWD', 'KZT', 'LBP', 'LKR', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MOP', 'MUR', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SDG', 'SEK', 'SGD', 'SOS', 'SYP', 'THB', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VEF', 'VND', 'XAF', 'XOF', 'YER', 'ZAR', 'ZMK', 'ZWL');

CREATE TABLE public.apartment (
    id integer NOT NULL,
    title character varying NOT NULL,
    price numeric(10,2) NOT NULL,
    currency public.apartment_currency_enum DEFAULT 'EGP'::public.apartment_currency_enum NOT NULL,
    area integer NOT NULL,
    bed_rooms integer NOT NULL,
    bath_rooms integer NOT NULL,
    floor integer NOT NULL,
    location character varying NOT NULL
);

CREATE SEQUENCE public.apartment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.apartment_id_seq OWNED BY public.apartment.id;

ALTER TABLE ONLY public.apartment ALTER COLUMN id SET DEFAULT nextval('public.apartment_id_seq'::regclass);

ALTER TABLE ONLY public.apartment
    ADD CONSTRAINT "PK_c3d874d9924f6f16223162b3d3a" PRIMARY KEY (id);


CREATE TABLE public.apartment_details (
    id integer NOT NULL,
    contact_person character varying NOT NULL,
    contact_email character varying,
    contact_phone character varying NOT NULL,
    description character varying,
    "apartmentId" integer NOT NULL
);

CREATE SEQUENCE public.apartment_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.apartment_details_id_seq OWNED BY public.apartment_details.id;

ALTER TABLE ONLY public.apartment_details ALTER COLUMN id SET DEFAULT nextval('public.apartment_details_id_seq'::regclass);

ALTER TABLE ONLY public.apartment_details
    ADD CONSTRAINT "PK_f17079602b9d7073420cda8966b" PRIMARY KEY (id);

ALTER TABLE ONLY public.apartment_details
    ADD CONSTRAINT "REL_129a102da0476c1a8caed21612" UNIQUE ("apartmentId");

ALTER TABLE ONLY public.apartment_details
    ADD CONSTRAINT "FK_129a102da0476c1a8caed216126" FOREIGN KEY ("apartmentId") REFERENCES public.apartment(id);
