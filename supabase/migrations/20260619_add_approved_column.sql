-- 1. Adicionar coluna 'approved' à tabela public.profiles se ela não existir
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS approved boolean DEFAULT false;

-- 2. Atualizar todos os usuários atuais como já aprovados
UPDATE public.profiles SET approved = true WHERE approved IS NULL;
