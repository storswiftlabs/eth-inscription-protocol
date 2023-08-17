PGDMP     )    0                {            inscription    14.1 (Debian 14.1-1.pgdg110+1)    14.1 (Debian 14.1-1.pgdg110+1) J    Q           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            R           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            S           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            T           1262    16384    inscription    DATABASE     _   CREATE DATABASE inscription WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE inscription;
                admin    false            �            1259    16640    chain    TABLE     d   CREATE TABLE public.chain (
    name character varying(255) NOT NULL,
    height bigint NOT NULL
);
    DROP TABLE public.chain;
       public         heap    admin    false            �            1259    16605    comment    TABLE     T  CREATE TABLE public.comment (
    id bigint NOT NULL,
    "with" character varying(255) NOT NULL,
    sender character varying(255) NOT NULL,
    text character varying(255) NOT NULL,
    image text,
    at text,
    height bigint NOT NULL,
    trx_hash character varying(255) NOT NULL,
    trx_time timestamp without time zone NOT NULL
);
    DROP TABLE public.comment;
       public         heap    admin    false            �            1259    16604    comment_id_seq    SEQUENCE     w   CREATE SEQUENCE public.comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.comment_id_seq;
       public          admin    false    219            U           0    0    comment_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.comment_id_seq OWNED BY public.comment.id;
          public          admin    false    218            �            1259    16623    follow    TABLE     �   CREATE TABLE public.follow (
    id bigint NOT NULL,
    address character varying(255) NOT NULL,
    follower character varying(255) NOT NULL
);
    DROP TABLE public.follow;
       public         heap    admin    false            �            1259    16622    follow_id_seq    SEQUENCE     v   CREATE SEQUENCE public.follow_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.follow_id_seq;
       public          admin    false    223            V           0    0    follow_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.follow_id_seq OWNED BY public.follow.id;
          public          admin    false    222            �            1259    16655    group    TABLE       CREATE TABLE public."group" (
    id bigint NOT NULL,
    address character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    height bigint NOT NULL,
    trx_hash character varying(255) NOT NULL,
    trx_time timestamp without time zone NOT NULL
);
    DROP TABLE public."group";
       public         heap    admin    false            �            1259    16654    group_id_seq    SEQUENCE     u   CREATE SEQUENCE public.group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.group_id_seq;
       public          admin    false    227            W           0    0    group_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.group_id_seq OWNED BY public."group".id;
          public          admin    false    226            �            1259    16496    group_message    TABLE     �  CREATE TABLE public.group_message (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    receiver text NOT NULL,
    sender character varying(255) NOT NULL,
    text character varying(255) NOT NULL,
    image text,
    at text,
    "with" character varying(255),
    height bigint NOT NULL,
    trx_hash character varying(255) NOT NULL,
    trx_time timestamp without time zone NOT NULL
);
 !   DROP TABLE public.group_message;
       public         heap    admin    false            �            1259    16495    group_message_id_seq    SEQUENCE     }   CREATE SEQUENCE public.group_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.group_message_id_seq;
       public          admin    false    213            X           0    0    group_message_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.group_message_id_seq OWNED BY public.group_message.id;
          public          admin    false    212            �            1259    16614    like    TABLE       CREATE TABLE public."like" (
    id bigint NOT NULL,
    "with" character varying(255) NOT NULL,
    sender character varying(255) NOT NULL,
    height bigint NOT NULL,
    trx_hash character varying(255) NOT NULL,
    trx_time timestamp without time zone NOT NULL
);
    DROP TABLE public."like";
       public         heap    admin    false            �            1259    16613    like_id_seq    SEQUENCE     t   CREATE SEQUENCE public.like_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.like_id_seq;
       public          admin    false    221            Y           0    0    like_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.like_id_seq OWNED BY public."like".id;
          public          admin    false    220            �            1259    16487    message    TABLE     y  CREATE TABLE public.message (
    id bigint NOT NULL,
    receiver character varying(255) NOT NULL,
    sender character varying(255) NOT NULL,
    text character varying(255) NOT NULL,
    image text,
    at text,
    "with" character varying(255),
    height bigint NOT NULL,
    trx_hash character varying(255) NOT NULL,
    trx_time timestamp without time zone NOT NULL
);
    DROP TABLE public.message;
       public         heap    admin    false            �            1259    16486    message_id_seq    SEQUENCE     w   CREATE SEQUENCE public.message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.message_id_seq;
       public          admin    false    211            Z           0    0    message_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;
          public          admin    false    210            �            1259    16567    message_window    TABLE     �   CREATE TABLE public.message_window (
    id bigint NOT NULL,
    owner character varying(255) NOT NULL,
    link character varying(255) NOT NULL
);
 "   DROP TABLE public.message_window;
       public         heap    admin    false            �            1259    16566    message_window_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.message_window_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.message_window_id_seq;
       public          admin    false    215            [           0    0    message_window_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.message_window_id_seq OWNED BY public.message_window.id;
          public          admin    false    214            �            1259    16472    profile    TABLE       CREATE TABLE public.profile (
    address character varying(255) NOT NULL,
    image character varying(255),
    text character varying(255) NOT NULL,
    height bigint NOT NULL,
    trx_hash character varying(255) NOT NULL,
    trx_time timestamp without time zone NOT NULL
);
    DROP TABLE public.profile;
       public         heap    admin    false            �            1259    16631    record    TABLE     d   CREATE TABLE public.record (
    owner character varying(255) NOT NULL,
    last bigint NOT NULL
);
    DROP TABLE public.record;
       public         heap    admin    false            �            1259    16596    tweet    TABLE     k  CREATE TABLE public.tweet (
    id bigint NOT NULL,
    trx_hash character varying(255) NOT NULL,
    sender character varying(255) NOT NULL,
    title character varying(255),
    text character varying(255) NOT NULL,
    image text,
    at text,
    "with" character varying(255),
    height bigint NOT NULL,
    trx_time timestamp without time zone NOT NULL
);
    DROP TABLE public.tweet;
       public         heap    admin    false            �            1259    16595    tweet_id_seq    SEQUENCE     u   CREATE SEQUENCE public.tweet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tweet_id_seq;
       public          admin    false    217            \           0    0    tweet_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tweet_id_seq OWNED BY public.tweet.id;
          public          admin    false    216            �           2604    16608 
   comment id    DEFAULT     h   ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comment_id_seq'::regclass);
 9   ALTER TABLE public.comment ALTER COLUMN id DROP DEFAULT;
       public          admin    false    218    219    219            �           2604    16626 	   follow id    DEFAULT     f   ALTER TABLE ONLY public.follow ALTER COLUMN id SET DEFAULT nextval('public.follow_id_seq'::regclass);
 8   ALTER TABLE public.follow ALTER COLUMN id DROP DEFAULT;
       public          admin    false    222    223    223            �           2604    16658    group id    DEFAULT     f   ALTER TABLE ONLY public."group" ALTER COLUMN id SET DEFAULT nextval('public.group_id_seq'::regclass);
 9   ALTER TABLE public."group" ALTER COLUMN id DROP DEFAULT;
       public          admin    false    227    226    227            �           2604    16499    group_message id    DEFAULT     t   ALTER TABLE ONLY public.group_message ALTER COLUMN id SET DEFAULT nextval('public.group_message_id_seq'::regclass);
 ?   ALTER TABLE public.group_message ALTER COLUMN id DROP DEFAULT;
       public          admin    false    212    213    213            �           2604    16617    like id    DEFAULT     d   ALTER TABLE ONLY public."like" ALTER COLUMN id SET DEFAULT nextval('public.like_id_seq'::regclass);
 8   ALTER TABLE public."like" ALTER COLUMN id DROP DEFAULT;
       public          admin    false    221    220    221            �           2604    16490 
   message id    DEFAULT     h   ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);
 9   ALTER TABLE public.message ALTER COLUMN id DROP DEFAULT;
       public          admin    false    211    210    211            �           2604    16570    message_window id    DEFAULT     v   ALTER TABLE ONLY public.message_window ALTER COLUMN id SET DEFAULT nextval('public.message_window_id_seq'::regclass);
 @   ALTER TABLE public.message_window ALTER COLUMN id DROP DEFAULT;
       public          admin    false    215    214    215            �           2604    16599    tweet id    DEFAULT     d   ALTER TABLE ONLY public.tweet ALTER COLUMN id SET DEFAULT nextval('public.tweet_id_seq'::regclass);
 7   ALTER TABLE public.tweet ALTER COLUMN id DROP DEFAULT;
       public          admin    false    217    216    217            L          0    16640    chain 
   TABLE DATA           -   COPY public.chain (name, height) FROM stdin;
    public          admin    false    225   �P       F          0    16605    comment 
   TABLE DATA           b   COPY public.comment (id, "with", sender, text, image, at, height, trx_hash, trx_time) FROM stdin;
    public          admin    false    219   �P       J          0    16623    follow 
   TABLE DATA           7   COPY public.follow (id, address, follower) FROM stdin;
    public          admin    false    223   wT       N          0    16655    group 
   TABLE DATA           Q   COPY public."group" (id, address, title, height, trx_hash, trx_time) FROM stdin;
    public          admin    false    227   eU       @          0    16496    group_message 
   TABLE DATA           y   COPY public.group_message (id, title, receiver, sender, text, image, at, "with", height, trx_hash, trx_time) FROM stdin;
    public          admin    false    213   mW       H          0    16614    like 
   TABLE DATA           P   COPY public."like" (id, "with", sender, height, trx_hash, trx_time) FROM stdin;
    public          admin    false    221   �l       >          0    16487    message 
   TABLE DATA           l   COPY public.message (id, receiver, sender, text, image, at, "with", height, trx_hash, trx_time) FROM stdin;
    public          admin    false    211   �n       B          0    16567    message_window 
   TABLE DATA           9   COPY public.message_window (id, owner, link) FROM stdin;
    public          admin    false    215   �u       <          0    16472    profile 
   TABLE DATA           S   COPY public.profile (address, image, text, height, trx_hash, trx_time) FROM stdin;
    public          admin    false    209   �v       K          0    16631    record 
   TABLE DATA           -   COPY public.record (owner, last) FROM stdin;
    public          admin    false    224   |       D          0    16596    tweet 
   TABLE DATA           g   COPY public.tweet (id, trx_hash, sender, title, text, image, at, "with", height, trx_time) FROM stdin;
    public          admin    false    217   *|       ]           0    0    comment_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.comment_id_seq', 15, true);
          public          admin    false    218            ^           0    0    follow_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.follow_id_seq', 7, true);
          public          admin    false    222            _           0    0    group_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.group_id_seq', 17, true);
          public          admin    false    226            `           0    0    group_message_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.group_message_id_seq', 84, true);
          public          admin    false    212            a           0    0    like_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.like_id_seq', 17, true);
          public          admin    false    220            b           0    0    message_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.message_id_seq', 37, true);
          public          admin    false    210            c           0    0    message_window_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.message_window_id_seq', 20, true);
          public          admin    false    214            d           0    0    tweet_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tweet_id_seq', 12, true);
          public          admin    false    216            �           2606    16644    chain chain_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.chain
    ADD CONSTRAINT chain_pkey PRIMARY KEY (name);
 :   ALTER TABLE ONLY public.chain DROP CONSTRAINT chain_pkey;
       public            admin    false    225            �           2606    16612    comment comment_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.comment DROP CONSTRAINT comment_pkey;
       public            admin    false    219            �           2606    16630    follow follow_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.follow DROP CONSTRAINT follow_pkey;
       public            admin    false    223            �           2606    16503     group_message group_message_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.group_message
    ADD CONSTRAINT group_message_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.group_message DROP CONSTRAINT group_message_pkey;
       public            admin    false    213            �           2606    16662    group group_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."group" DROP CONSTRAINT group_pkey;
       public            admin    false    227            �           2606    16621    like like_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."like"
    ADD CONSTRAINT like_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."like" DROP CONSTRAINT like_pkey;
       public            admin    false    221            �           2606    16494    message message_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.message DROP CONSTRAINT message_pkey;
       public            admin    false    211            �           2606    16574 "   message_window message_window_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.message_window
    ADD CONSTRAINT message_window_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.message_window DROP CONSTRAINT message_window_pkey;
       public            admin    false    215            �           2606    16478    profile profile_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (address);
 >   ALTER TABLE ONLY public.profile DROP CONSTRAINT profile_pkey;
       public            admin    false    209            �           2606    16635    record record_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.record
    ADD CONSTRAINT record_pkey PRIMARY KEY (owner);
 <   ALTER TABLE ONLY public.record DROP CONSTRAINT record_pkey;
       public            admin    false    224            �           2606    16603    tweet tweet_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tweet
    ADD CONSTRAINT tweet_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tweet DROP CONSTRAINT tweet_pkey;
       public            admin    false    217            �           1259    16637    IDX_comment_sender    INDEX     J   CREATE INDEX "IDX_comment_sender" ON public.comment USING btree (sender);
 (   DROP INDEX public."IDX_comment_sender";
       public            admin    false    219            �           1259    16542    IDX_group_message_title    INDEX     T   CREATE INDEX "IDX_group_message_title" ON public.group_message USING btree (title);
 -   DROP INDEX public."IDX_group_message_title";
       public            admin    false    213            �           1259    16638    IDX_like_sender    INDEX     F   CREATE INDEX "IDX_like_sender" ON public."like" USING btree (sender);
 %   DROP INDEX public."IDX_like_sender";
       public            admin    false    221            �           1259    16541    IDX_message_receiver    INDEX     N   CREATE INDEX "IDX_message_receiver" ON public.message USING btree (receiver);
 *   DROP INDEX public."IDX_message_receiver";
       public            admin    false    211            �           1259    16636    IDX_tweet_sender    INDEX     F   CREATE INDEX "IDX_tweet_sender" ON public.tweet USING btree (sender);
 &   DROP INDEX public."IDX_tweet_sender";
       public            admin    false    217            L       x�K�O-���44 ����ʼd('F��� ���      F   �  x�ՖKoU�מ_eM��r���*^�Bb,�5q�8i떲KEQ ��B�D�(�$!E(j��3���>�.@�5&���h4監���=���Z`���\J0����}4�k:�\�Ϥug�
Ų2Ay�d���)��BZ_[�akp��o���|VNa�Vyg��_{�mZ|�E [��,C��] ���֮��9	��*�_:r�����g �7�+���R�BE�
�@Ԗ؇�mJ����X����c�P�a������6�N��Ҙm� ��QZΦ����Q��t۳��|�*P�Ɨ �51� S V����<gf���Ez�ew���r�����z^����Q����b����KÛ�6"������Z��޻�W�MYY_����zWV���Ws���%d�7+~ڭ��G����+�)�\�����,S�PP�$gS���A�:*W�#��Ld�W��n�x���4n��bt�R��&��� �	6�%jD�c���3%�S�d��h&|:o�S�OW���.�$I�sXP���ⴷ����L��#�D*3Z��;>��]�p\�R��[[�G+�f��au�	Ƅ��W䠃�ԹJ�[p&~}�����d�`u&�;����L�DG�er�i��-W{�+����?��l�����BKI�x�*_��Hœ|b1��Bǟl���;~tgtoo��_>o>}�-����=���xg��`��৓/��<ޙ����|�(�hl���%���H�C
��b���r�ܚ����}S��U"�s����n��=8~�;#q�j>	��0S��-������ߞ�~;:�=#�����8*'��ێ�?>|r|����Ǔ���N6?߻?�z6�r�ݣ�6��;����u��      J   �   x��̻q!�a[�b�y0&,Grxm
_�θ�6���W��h*8�	�a��
#�1�L�,���� ����Ew�)���1��؁�rxϕ�f�*KJ|(��q��egҍ��M8��\y�H��';6����'��yN�������WaO͗0��צҪF��<�%A�sG�ʓ�����˺�b��-w�W��\�SwL��y�Y��8�vZvp�u���B��˂�      N   �  x���=r1F�S�L��Z��43[$T���H#�qa�p|4��ӱ���k��'���4GW�y^)��lu٪��5S�gu<})�^�__�	a/��I,�ģEѰ�X_{�V����f7�m�H�8�" Z�牀����t!�h�J�5���[0�ҹi��6LK�6�y�üX'�C������^]�vk��[��+�z��O2�
54���Җǐ4���Hq��n0X�y)N:���T��9�ϵ�2p3��ӧ���������}��:��&)���:f����R��-vN+R�x��O��M�Իx�4�i�Z{$�,��y�#�P'�[�:ֽ��"C,��EieJ�L��J�#��&���h9F�qZ�\R[L�F��jN�`[:ҍqM��c^8�j%����h�a�Ը�&�{>������������;��~�P�i�r>����#�h$�?p#��,�+JT6�0���XX�����r�<�=w�y����i����Y�      @      x��\[SW�~F��'U�9��&}�OG\<I%�}�k\u��%m�Ǣ[��1�I�$Hؘ;`0�cB�_2���'�����b�3�H�3��P��ڽַn��kw��꥾�{Q��4��+�i��͸y{'�AT�������.Z�*M�]s<{Z�7�	|�'�q��5+eW���i1���p6f�m��Y<�n�?n�|S^}�(>�3���uQ��\�:���C���&���@$���yF�K�[�d^�&�f��|�a(�i�-��O�i�`�d��nmm�`E;+u��U�
Hq{[Y��P��f�@�Π�niT[��j�¤�~��B��8��7Gߛ�EFh�@t��|8�q���b�ʿ��8���G��b)?͕��L3#��| ����07��(��e�K��qj�;��_:��u�c^�K{���_��ꂋm��Zr	Rpᓣ�ƈu�f���o���<��wFJ{87h��K{�����˃�O���s��!�Y�%�n�׌�3����J��u4��7�K��5����_>2����##7qK���:�z{Q贘iH�s�t~2��������.�%�v六sm<7:<��mw�D�����+u�O{�H�n��[}B��-�L����Ξ���q�6���������F~��������E96
�g���`8�5�8pd�Ҋn�.��e��_�&B'�X��&��B�z�Z<�*�6���!�]ip
\�1�w��>yO\-;������(�m|2����ZS�f� ���Z�h�\��4��V!���X#7��IX��+s9�/�3�qg1sa`5'6p|�\�/�� 	���>Ii[y/�p����#_�����>^D��/�7����������㥙��cs1Q1��;�]O�6`F���],�@y� �팀%/d�ݩ�k.��P�5��10rŒÃ�lΩ��Я��)�c���S���b�T�G�ı�h�Z�'K�
pM9�2g'���*��4���S��ҭ��6%	�#CW�Xƭx�����*s�6/�����D7 ;Hm�^L��M��At9Zģ��̮A�4 N�D
��Ԭ�4
o�sNe̽BC����bUEX^�?�H�i�90���E0��%�d�yX�˰2T�&�R	���t�"���>z���C��_BI�W���ʱq�`��7`)�=Sz	��!.���{A�1g�:V������| ��e K�-k�-^�%W���-�[] ��f]�T�ķ)��x�(�m~�ig�^$�n�����hk��F��H�ύ��D#�G�l~�LN��Y�d8�р��l'W��zqf;G(�Զ��es9�I,��1���gN�O��Q�<�$h#�U�ɖWg	W�J�r�y&*�����$N?��t9�"�@*=yM|y%�n��g������
�|��W��"�y
z�~t_R���.�G��?��[�����������/���\sP�����W�]��鶢Qa5p���/ �d�U�y��i��U���%^� d8��ꑸV�n}�&�U'п�q�"�U���D8?U�jAv>�Q=���"�0n��n����;�@���W����4q2;��Nf� q7
���(�PF3�Ɠ��G���%S�b��)sf�{G12�����祹ys,S.L��j��s�ȱ�\��O|����o�O�c��n�^
�(@�j���*ϹD����4SSf��oס�-�s�D"A��sMؾ������/1��
���س���֐��FDN��n�Z�F���$���4��0��~ء�
��h��K�n��YQd�n�-"���D���s�T�!}�X��֬�WLQ��DV���`%$#Y��`������v����� ԯ"K��*T��lU#�",?y�������$7��!&�n��*� �sO����{Ui��cV~J?0���<�V�p/��ѕ���J�~%9����32�E^Q����v�Udn^��ʊ4��²�f������ɮ���;�%(I���&L�����b�{]�v�V�D���#�ن �rѐd�.��Y��LgHz�IUr����co�Osf��'������k!g.����@B�P�D��U����)�b�rf<em'ʫ#8���g��$���QRJ�²�!�:T� w���xw�>xK�p���x��������1r���60��� ��g��%��c�[*(-���2�exYp��D��0'Ѽ$v�>�ZFw@D��жy�%�'��J�
�P@�oh��IN���B�[���s����_���fJ�����I�#NM���Cg�s���C���c��	���Ʃ��ŭ̶9��X\�!X���vNs�M)�İ��$�OʳS�^6��qsn���)�9���x�����<�����DG�I3�N��pҺe�l�8Ix#P��$y�K.m<�;��F�HE��ָIK�UK��nX��ȿn#3-�d�*�5s��7 ��.��q�/�ע� ��F�&}j���No��>���ݣR7�
�J��k�B�PX��[�`00@���KEz��F��S�CD! ��U����J���_�=(�>d��8�-Ս����]\#��P��aʧ���"�]Q���C�H�`�Ӂ��"�e ÿ������y2��}�Le�{��V��� )��Q��R�+�]#(�����y��4���I���\\�N��lwQ�j @u���p�H	P�z�ˁתZ7�Y�DT]_����W�f;]_D�U(Lu顏,A,t:X'W��Ν��C&�T��nah�H�}���T��-��}J?R�����z��һ�T�j�TB�	�^�z��D�ʇu�\j�5� ���}�>����;#�)x3�!j�����4S�)������h���
�y	Gū�� 2��(�W"�5��}���:�|}!52@�'�^���ҧ� �z���h�<��Q�����ig>��Gzl�ux�[�Q�^���#��υ.+
u��خ��΄G�P?�k�(�T'�T��h[��]��=
�PU��=�x �W��v���n
��hPX�2���BU�w~��"�	(%F��炐c��u��Fv><���`w�.��]A� �W}��o"j�N_!x�� �H-��
�G�^�H��g�/rp��-ܫ��எ�*����Z�n��F!*�t���:��J.�
�����((�{r�W�Xu�D��?��;կ��~�A�A�'�(�T0���@�ښ�*�<��T���.�m���2#xg�}S_H骬e߱_'� �9���� v����� }ؙ֯v�pO��5�w�w�#��.�
��%�n�}�ë����qt��;��U#>�S��` 2X��Z�8p^�3�[pd�	mCn�Ɋ)s�9ٞ9�	��>?��l0�V_[3�*�2|��~q2o���A�����e!�B�bM�:����;�Ȟ���S1H� �v֝�*#��J��rt�t���J/nN�AA��B��Q�*ϧ�ż�l��P�i<�V����ᴘ0��K�Һ�7!���p�^���s�Ոn�{2�h:&���uf�������^}��K���I@]�5�N���3͒@u���~�Y���U�[A�u"�ś���Zd�+�"��S�Y�$��z`�j�]�R��ޝI[e�w��F\5(��9g�ŋ.��p9��8>b>O�\�8���ޜ���ݔ9�JS�<����\ȃG�(N'�"�0�gf*�cy�q��7=� ��shcڻ�Y�
?�]����А�ЩUh�/��?C�hcr&�
�������xw��O��b�����?�D*�������3�2��r,E�(}=���+�8��7�����T�k�ի�W ��F��\B#g�<�\]��F_OE���ŕ"dƷJ�wN.����S&g��W��X���f���'��cx�dW���(#���\$���XC��Kl������㚕��3���$�䧃V"�Lk	U���Y`�#]���:d\�x����FD��z�x'I�s��.g��Ǚ��&,y~"   �8zZ�J:���(�=���g���$�/�K�#]Sfb����l.��,$�ou�*rm����+fZx�%6B���ĳ"L��Ƙ�ϓ��ܐs�������fr�z�7G��'��>/\L^ɜX���~�(�|�|��t��[ER�]b#]�' ��	��'D2������b't���J�
���Z����������kv1J��rʭ���*�׎Y�q2��B�8��R6k/� �Du#ݷCzD���C�W��O*1�;��Sf֭7o�|�<�of��_��sl��HoЎ�S�a�>v;@�&�ZH��׶��(�
TJO��ݺF�O�N�J'� �9�iH���w���o�䨵�{��T�u./�l^j���D;���W�]~�,9$���pcsv�\��]<N�	r.�>�
�А�Pm�*��j{�,���jғ��N=�h�l(�h���N=�h��nv�AgB���'�o���t�ݐ���.�t�LM�b�F$���6u#���?��"9���5���c͝�o@G�!FUǚ��]D)!D���` )ag���41jnn��}�3�umޟ)�A\
u;�̓]����p6��s�ٸ��C����i6�&|�~�*��	RT�2��}�deӉfh{���GnI��]���ϖP����9}x�l���)R8�{�}��	�>�	��S�|���,@��ޡq�Ы������V��E��)ұ�q�Ο��A�����s��Y�եr�5k���c�O_��]`�_h4�$��j~���0G��jd��)�p�!s7�ɨ~������P8���<E��A�2�� �f\yq�=x!R�º���� |~�!2ֱ�ِ >Ӹ�ᙺ=�'��$�*�5?u�1��
�8�%��*�d��C��1��p���LW��vp�G�$��VQ��;:�C�熑5L�#J7r��dH9@�h����̺A��ߣFP �%��>%�v�>�16q�s��an��'��L_U��gd d����j;5����t�sqތ�IΑG��>^�0�c�312�[~r���(Z�90m�>ix����]Huk&�ТKf>	�ZϚS��y�4a9��	5����o�q��#���G��I�8;�~��\ ݲ��r������N8���skb�����$�-0��p�\�0ٚMR�ÿ��D��	��k~�O���l�⯈Eϥ[Z7�?&3��ٲ��+���=�`��HZos.O\��9�c��qE��̉u�� U"�Q�.b�xf�<�O������ˮE�����k�-4����r��x��      H     x���ɍ1Eϣ(��\ĭo=[�P[����j��")�^�7�NU\{���k���g��\'c��7����f�b�%3�@9�սc.���]�_�_�_��@����_w=�s�����&e�y���u�A61��6'p:���)���M������#q�x#iZ�c� ��X����6N#�V�,�Gz�;�L�����o^���+���&R����7����5twc����<��D`U�hl�M?u���{<B�����+��с?�P��|}2�լ3#e�CtޢL�J8�U�p�N7�s`c���m�>�dt?�1�z]��5x�h<��x޿EXs,�5�����c�0�2�ʇ�zC�����W�t�����k/M��:aA�+|��εe�A�մ@�����s�%۩�q��ƺ��]3h�i�)�� ��b��UQ{
^��5��]�{�g���U/nX����qh�f�[��ʿ�Bq��T�1g�,�DY��jU|�4�k�q�������MF      >   �  x��WMW"�˯�ʼ�PU3��0���A:�Mm�鼗�@�|����ض6���D-
��{nU���*D�[DߓK���{�>{�+
S�΅��xD�����J���y��}3���G��Wgf���o �zV�#3�o6��C��7:������������� �]4,�F.8���4��?�f������
)߃v���Z�<�v���zY�Ձ�m�l��-\ųq�w��*��C^������l�g����06y�kf>����Л�ֿ�� w�'�pX�}���(	�*��W��1�o�y��5ܝ���N�h%pGhg!uL3E�q��݅�4����g;�������t�`��9��*��4sI�w!����L���C.��4���K+/�����G����ו��{$��oI\�ya�Y��.K?�����~��?���Xx��/��,�^.K�E���Jl���b/����D7}�i���<s�����W��� >r�y<_x�AQJ��O?����L`^���\T�x�o6♞	�n9 ���yЈ��2�>�j��i
�:ez�Ё�`�O��~l���3[o��:��L۰�SSY?�z
���M�|w>��J.����Pnk�W��u�Z�h�A�1�����2��1Ji��?��N�6��'�����u�����:"_E�0���F���p'�iy��x��7������<�`���i��+�@9���K�z3.G|���Li���{�L�X�s�������q�uҁ��Q���a⼑��7����K
~�x LZ�o�bT��sa�(K��}(�kbP
�D�Ca�R1�-���&��:� �װN�Xo�8�[*a�5����_�#$UC}��gC��Nj�J���3�3޴�h׉@4/�Z��[vĿ��ve����Iv�G|o�:(iВ���@��^Yyq5�f^�Ȓb��l69 ��0a���#(��ҡ��7���x�����yV�H��q���P
z�.�s�V�mIuX�Z$/���:�����ۇLӱ}T�w�l�E�T�q���K#_i�n�������:�%����� G��v��%���<W�J�J��Ϭ/��FKm��d���n{ gd�D�*Ͼ��[�l�76���0��0탵ݶj��By}�@̈́�)2���f+*�#(�A�d�_� (����7m���/��&����q���3��k��
IǴQ���&��1F0G5�M�[p���f�-�*�4� �E���"°s�Dpr���]�P���GC�od�RG$4�=�U����g�<.������
xRdfA���^y."��3Q��[�ݩ����|���6w+����9�/|����y{��9%�K��6��$�C9�2�W5��E���.R>����%�ڿy{��elq)�����?Ec���X���F�F(�g����P��J"4q�6>�|{��9g���iH�WF]���8���afu�=%��+6�$tjW�M� �&�̳����ǯ�;����&(u6l��t�����f*t<�c�p��q��~[X	�j�D��*s0���%������j����̯SW��Q-c�X�v��]-�O;�3����v�xP�0	n4O��*�R����z�h����?b�n���7�j�����ת��
*$��]���[me�x�D���OnQN&e�;�6:s�m!g�N�$\&FT*;�)��
j�i�$��~�r�����(      B   �   x��ιm1DQ[F�}�<f���kbP����|��P(_��/j���tw�+D�M9#f���T	�L��*9��Rc���kc�UA�Vx]�P���j��͇X�˺��"j}��0_	�,0u��Ȼ��ZD�	�$����t�����cL����V�h�0�6y��xS&�����Y�����Dr�D��m��C��.P:�y��9c�Z� ��;���A��      <   g  x�������c�S��t.u�¬��NրB�zH�C���ֳ��ة��7�dc� ~A��o��lc̝���-`���}��~���
C6�Yc���^,�6�z-��Rb�\���@q9�A�ZT�18AH\��k�%���W�,��4������
�HϩӤN'u��:��ӳ�yR�:_@���ճ�դ�N����\]�s�X���� ��Yv���Gu�z9�:C�6���ٺ6�
3ji[囡�bs7�/_��(����W�ӳ������H��W�YprJ5:S�L�B[4�s=�̾���n�+3�������Ỳ�bh���x�U_B4��L�Ѝ8�,�,AW6���H�����-�\4*N���O���ʆ㞣J�@��YPu�s�� ���(�a�p�Ƴ�T6�M�b���x?��m�I�$� �?c�y�Le+Agk�N�t1�T_2+�LIݪ�X����M�gA8�@��y�}��Z<p��F�^�j �4�9c��Yde���뙬9$T*��ql������ܬl2ƴ[Qk�8���ܑY9��D)�EOU�xq�X�w#���b���_�0<Ĳ����6�ܔ��9mes8�7������p�S���i/�ߩ�m|K�e������fq��n^��|^Oq�"6^�4��p�MM��IkJāI{g����7�4��F���8�5++�Ff�8tVk6(5;
nJR&=͗q�݌������ek�k}��6���^����C����^��x_�����8#�9�!�y��y��$,n	S���4O	����2"=���q�����,a�~�(G�K�0��Yt4��M�5hG�Y��ۯ}�����.��\ޘ�������z���~}���a��7���ۼ5�5Ch�S�������?>��ۏ~���&ֶ�N\�V��k�""�8���4�D�鲱=��%l��������o����?}��o���8���3�w�T�����\�z-�\`���%<2�<v�v�;��MƁ>_�.DQ�ue�-�6�ƀ��|2��ݏ����o��uy��ϒ�?�3��ɪ`$��^q��k�젓-ܐ�HV�%lw*׫ۻ�C���ìY��Ш64�r�֠�@�Q����v�khU'D�K��M�\ovefs��]l�`�gwƱh�VL�6ua�.�KQ��.��}��yʩ:k��
�Pv>4�3J�P7-G�aPG��2�K�������F�T�Ц/�w�5��y�P�fVk�4��E������$:�;�ı
���Tg9b�M]��6h؀2z��nk�wq�p�_M�ׇ�9�lp��q��p��XfV}�"b���R�c[�;sQ���Wi]ꯙ��T���W/����\:%      K      x������ � �      D   	  x���KS[���ҧP�*��G��$de3�E�J�,���k3���1�6��C�m ?���0��������+i寐Ӓ��TM*���%t�O���w�}�ЗX"*����9#$A.�VG��$2��m	�	RR0�$e�0�#"��`Bs��eI�*Z��*=�3�b�Y��8��}<d/�|��ɉ�#���Wn��'���ㅿ�������p��RQ%�D�H}�X���XY���`� ��C��jiǔ#jb�re8g6!DE�8QL�HP�8�(�ejʰ"��GH%i����rűhhbl��@�d&�s�?OF�&&��/���p 4�E�����"�X,4e���*���d�#u:�	��5�Hو{�C�d�`�Ul\%�(ǑQ<�DCf�Ȋ`�rer$=P0��c>w�3֎�������n��ɡ�	�E���092��_
�>ɳ��	����X(����$$����(�$bkm"�\�a&0+�	J9 kƊ�B\�(�!��@D�
�PZ*+�����v
��o�q0�a�O��*�Xq��f�iH`S� %8�%2������gt&��!mT�x̋bTFf�i>(]�JDIK�r��Ј�]��$J�V�L0�	@������$(yH���7(��I���	�eB�	����1�����R��Ei��@���@���/��o�x+d�0�KX�&�Ʊ�t\$��XB�%��X �"p_!�ǵÈ+ye�4Q��<�����B��ݐ)�+X!�2����6��,|Q$2�Xv���N83�!	��4�)��(+g�L�2쒤�8j�����咀H�U)��6��'+��c{� m��gU�u��<NKsmݼ�6�f�3Ϗ������η��+i}*�_#����9�V}m�|�u���/^էZ;�~�0m|ݾx�u����Vm֟�F��?j����R3�?�'�~a�穋����Ӵ��{G���ߛͮLe�{?O]J�K���V�X��HZ_��0������ݝ���?]M՞�l� b˖v|�IvkF�w�K��i�G��o�ɮng�������G�����.������d|࣏"�|��x��ш|n�?�={>:7���0�T���Mw�������䧟�a99�>�p�|8:r���OǚT]k� �J��R	Iꔦ�RV��9(� �"1&�X�G_��EBV�*�iI�
� �Dr�"���^�Ԃ�wi�8Њ� ��p$ǁ}�@����9�J�P��i��7���H1�`���c�"�ܯw>��\�6d8 ����:מA����<n=n��{Ϗ� �Ϫ��`X|5v}�Hv���xJ��}g.�w�̧�����-���ɮv9>�G��ế� �Gs�=���f7=�ճ c:S���R6�|ޝ�3�;�����ʻ[���˾���Y_���a��j�8::��h�d�jZk�V�~�(Ozt�c�pk� [��ˡB|u?�[sB8����H�z�`S%7pm��4|+Ɖ��B��T�μ�~J\�1
��Y��%��i@#h��02�v9��$@����J8c��o���v��:�{��񦿲2���U�s���v�ps�?}�v^����VZo v!��/��7 ,���UW@���]��4�@��C_���Rk���?~�-X���~�ڧyy,w�Aq����p����?��w����1���V�~��t_�Wڸq �غ��o����S?u+f���jX�j	.u��77B\�}E�ܬ�v.���0qn�����ځ�1��;���j�ړ��Nύ�d�}��Z���´I��	e6�Ҿ��f��!�tJ�-N�w ����-�FoS��/���ŖYhd	\�b��à�B��S\�DL����HcD0��R,���Aqz<ۗMHB�ֽ�~��Fo ����&��70�����P�7$xy/���?�ѓFxB���"t��!��Y���[�YhR�_����>;?�w��������Z #@���l�م�n��7 }!�0����I�=�s[K{��t��B���H�? �������Ux�w.�i ����?�����	 v}~i��s�p�N��@Q��|YR~��)�;��Z����W[7Na�N��Z����E���ޝ?�{qk	=��[S��`���#4�1��F�����m����C{}IIc�ΕX�ȅq�X��6�C	��v�Ԯ��7���4Jړ�?V������5�r�?c����y��䧓"���x
=ԋL�3!C��ɇ�|�? R~y     