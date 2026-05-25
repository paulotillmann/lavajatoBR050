import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import carretaImg from './logos/carreta.png';
import {
  Database,
  Cloud,
  ArrowRightLeft,
  Play,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle,
  XCircle,
  Loader2,
  User,
  Phone,
  CreditCard,
  Wallet,
  Info,
  ShieldAlert,
  Menu,
  Car,
  Calendar,
  Layers,
  Target,
  DollarSign,
  Sun,
  Moon,
  Truck,
  LayoutDashboard,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Bell,
  Plus,
  Filter,
  FileText,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Award,
  Wrench,
  Sparkles,
  Clock,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  Key,
  AlertTriangle,
  Pencil
} from 'lucide-react';

// Env variables (read directly from import.meta.env or fall back to user credentials)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://funzoqxomyhhfvdtpmlw.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1bnpvcXhvbXloaGZ2ZHRwbWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MTcyNzgsImV4cCI6MjA5NDM5MzI3OH0.8uhlJWO6BzQR8NoF8YrzeN8dWZ2DrXy-iTRoHwbcEjc';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const BUBBLE_TOKEN = '6066b185cb200592e09cfced5a33a4fd';
const BUBBLE_URL = 'https://lavajatobr050.com/version-test/api/1.1/obj/Pessoas';
const BUBBLE_FORMA_PAGAMENTO_URL = 'https://lavajatobr050.com/version-test/api/1.1/obj/FormaPagamento';
const BUBBLE_MENSALISTAS_URL = 'https://lavajatobr050.com/version-test/api/1.1/obj/Mensalistas';
const BUBBLE_MENSALISTA_PARCELAS_URL = 'https://lavajatobr050.com/version-test/api/1.1/obj/MensalistaParcelas';
const BUBBLE_METAS_URL = 'https://lavajatobr050.com/version-test/api/1.1/obj/Metas';
const BUBBLE_DESPESAS_URL = 'https://lavajatobr050.com/version-test/api/1.1/obj/Despesas';
const BUBBLE_ENTRADAS_URL = 'https://lavajatobr050.com/version-test/api/1.1/obj/Entradas';

interface Pessoa {
  id: string;
  nome_pessoa?: string;
  tipo_pessoa?: string;
  celular_whatsapp?: string;
  cpf?: string;
  cnpj?: string;
  cidade?: string;
  uf?: string;
  ativo?: boolean;
  raw?: any;
}

interface Veiculo {
  id: string;
  ativo?: boolean;
  placa?: string;
  marca_modelo?: string;
  tipo?: string;
  pessoa_id?: string;
  pessoa_nome?: string;
  motorista?: any;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  raw?: any;
}

interface CentroCusto {
  id: string;
  ativo?: boolean;
  descricao?: string;
  nome_centro_custo?: string;
  tipo_recorrencia?: string;
  tipo_movimentacao?: string;
  valor_provisao?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  slug?: string;
  raw?: any;
}

interface FormaPagamento {
  id: string;
  ativo?: boolean;
  descricao?: string;
  tipo_transacao?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  slug?: string;
  raw?: any;
}

interface Mensalista {
  id: string;
  ativo?: boolean;
  centro_custo_id?: string;
  dia_vencimento?: number;
  marca_modelo?: string;
  nome_pessoa?: string;
  observacao?: string;
  placa?: string;
  plano?: string;
  valor_original?: number;
  veiculo_id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  slug?: string;
  raw?: any;
}

interface MensalistaParcela {
  id: string;
  data_pagamento?: string;
  data_vencimento?: string;
  mensalista_id?: string;
  nome_pessoa?: string;
  valor_original?: number;
  valor_pago?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  slug?: string;
  raw?: any;
}

interface Meta {
  id: string;
  transacao?: string;
  valor?: number;
  data_meta?: string;
  mes_ano?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  slug?: string;
  raw?: any;
}

interface Despesa {
  id: string;
  centro_custo_id?: string;
  data_despesa?: string;
  descricao_despesa?: string;
  descricao_forma_pagamento?: string;
  forma_pagamento_id?: string;
  nome_centro_custos?: string;
  valor?: number;
  valor_provisao?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  slug?: string;
  raw?: any;
}

interface Entrada {
  id: string;
  centro_custo_id?: string;
  data_entrada?: string;
  descricao_entrada?: string;
  descricao_forma_pagamento?: string;
  forma_pagamento_id?: string;
  nome_centro_custo?: string;
  nome_pessoa?: string;
  ordem_servico_id?: string;
  pessoa_id?: string;
  placa_veiculo?: string;
  valor?: number;
  veiculo_id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  slug?: string;
  raw?: any;
}

const App: React.FC = () => {
  // Supabase Auth States
  const [session, setSession] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Auth Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regNome, setRegNome] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');

  // Auth Feedback & Loading State
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Navigation View State
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'entradas' | 'despesas' | 'mensalistas' | 'pessoas' | 'veiculos' | 'formapagamento' | 'centrocusto' | 'ordemservico' | 'migracoes' | 'laudo'>('dashboard');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isLancamentosOpen, setIsLancamentosOpen] = useState(false);
  const [isCadastrosOpen, setIsCadastrosOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<'pessoas' | 'veiculos' | 'centrocusto' | 'formapagamento' | 'mensalistas' | 'mensalistaparcelas' | 'metas' | 'despesas' | 'entradas'>('pessoas');

  useEffect(() => {
    if (['entradas', 'despesas', 'mensalistas'].includes(currentTab)) {
      setIsLancamentosOpen(true);
      setIsCadastrosOpen(false);
      setIsConfigOpen(false);
    }
    if (['pessoas', 'veiculos', 'formapagamento', 'centrocusto'].includes(currentTab)) {
      setIsCadastrosOpen(true);
      setIsLancamentosOpen(false);
      setIsConfigOpen(false);
    }
    if (['migracoes'].includes(currentTab)) {
      setIsConfigOpen(true);
      setIsLancamentosOpen(false);
      setIsCadastrosOpen(false);
    }
  }, [currentTab]);

  // Fetch user profile from public.profiles
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Perfil não encontrado de imediato, tentando novamente...');
        setTimeout(async () => {
          const { data: retryData, error: retryError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
          if (!retryError && retryData) {
            setUserProfile(retryData);
          }
        }, 1000);
      } else {
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Erro ao buscar perfil:', err);
    }
  };

  // Auth state monitor
  useEffect(() => {
    // 1. Verificar sessão ativa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      }
      setLoadingAuth(false);
    });

    // 2. Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        fetchUserProfile(newSession.user.id);
      } else {
        setUserProfile(null);
      }
      setLoadingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handlers de autenticação
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      setAuthSuccess('Login efetuado com sucesso!');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setAuthError(err.message || 'Erro ao efetuar login.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);

    if (regPassword !== regConfirmPassword) {
      setAuthError('As senhas não coincidem.');
      setAuthSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: regEmail,
        password: regPassword,
        options: {
          data: {
            nome_completo: regNome,
            celular_whatsapp: regWhatsapp,
            role: 'operator'
          }
        }
      });

      if (error) throw error;

      if (data.session) {
        setAuthSuccess('Conta criada e logada com sucesso!');
      } else {
        setAuthSuccess('Cadastro realizado com sucesso!');
        // Login automático após cadastro para confirmação instantânea
        await supabase.auth.signInWithPassword({
          email: regEmail,
          password: regPassword
        });
      }

      setRegNome('');
      setRegWhatsapp('');
      setRegEmail('');
      setRegPassword('');
      setRegConfirmPassword('');
    } catch (err: any) {
      setAuthError(err.message || 'Erro ao criar conta.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: window.location.origin
      });
      if (error) throw error;
      setAuthSuccess('Instruções de redefinição enviadas para o seu e-mail!');
      setForgotEmail('');
    } catch (err: any) {
      setAuthError(err.message || 'Erro ao processar solicitação.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err: any) {
      alert('Erro ao sair: ' + err.message);
    }
  };

  const renderLoginScreen = () => {
    return (
      <div className="min-h-screen w-screen bg-[#090b11] light-theme:bg-slate-50 relative overflow-hidden flex items-center justify-center p-4 sm:p-6 font-sans">
        {/* Animated Background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />

        {/* Outer Split Card Container */}
        <div className="w-full max-w-5xl bg-[#0e111a]/40 light-theme:bg-white/80 backdrop-blur-xl border border-[#1f2433] light-theme:border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative z-10 min-h-[600px]">

          <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#141414] to-[#080808] light-theme:from-neutral-900 light-theme:to-neutral-950 p-8 sm:p-12 flex flex-col justify-between relative">
            {/* Background Image with slight blur */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-100 pointer-events-none"
              style={{ backgroundImage: `url(${carretaImg})` }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.08),transparent_50%)] pointer-events-none" />

            {/* Branding Header */}
            <div className="relative z-10 flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-900/30">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-white text-lg tracking-wider flex items-center gap-1.5 leading-none">
                  LavajatoBR050
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                </h1>
                <p className="text-[#64748b] light-theme:text-slate-400 text-xxs uppercase font-bold tracking-widest mt-1.5 leading-none">Plataforma Financeira & Operacional</p>
              </div>
            </div>



            {/* Info Footer */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300 light-theme:text-slate-200">
                <CheckCircle className="h-4.5 w-4.5 text-cyan-400" />
                <span>Gestão Financeira on-line, gráficos dinâmicos</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 light-theme:text-slate-200">
                <CheckCircle className="h-4.5 w-4.5 text-cyan-400" />
                <span>Segurança de nível corporativo com logs de acessos</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 light-theme:text-slate-200">
                <CheckCircle className="h-4.5 w-4.5 text-cyan-400" />
                <span>Mapeamento de Centros de Custos e Metas</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-transparent relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(6,182,212,0.04),transparent_50%)] pointer-events-none" />

            <AnimatePresence mode="wait">
              {authMode === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6 relative z-10"
                >
                  <div>
                    <h2 className="text-2xl font-extrabold text-white light-theme:text-slate-800 tracking-tight leading-none">Bem-vindo de Volta</h2>
                    <p className="text-xs text-[#64748b] light-theme:text-slate-500 mt-2.5 leading-relaxed">Gerencie suas receitas, mensalistas e ordens de serviço com agilidade.</p>
                  </div>

                  {/* Feedback states */}
                  {authError && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2 animate-shake">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </motion.div>
                  )}
                  {authSuccess && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{authSuccess}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-[#64748b]" />
                        <input
                          type="email"
                          required
                          placeholder="seuemail@exemplo.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full bg-[#090b11]/80 light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">Senha</label>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('forgot');
                            setAuthError(null);
                            setAuthSuccess(null);
                          }}
                          className="text-[10px] font-semibold text-violet-400 hover:text-violet-300 light-theme:text-blue-600 light-theme:hover:text-blue-500 transition-colors cursor-pointer"
                        >
                          Esqueceu a senha?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-[#64748b]" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••••••"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full bg-[#090b11]/80 light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2.5 pl-11 pr-11 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3 text-[#64748b] hover:text-white transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={authSubmitting}
                      className="mt-2 w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white rounded-xl py-3 font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-900/30 transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {authSubmitting ? (
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      ) : (
                        <span>Entrar no Sistema</span>
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-2">
                    <p className="text-xs text-[#64748b]">
                      Não tem uma conta?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('register');
                          setAuthError(null);
                          setAuthSuccess(null);
                        }}
                        className="font-bold text-violet-400 hover:text-violet-300 light-theme:text-blue-600 light-theme:hover:text-blue-500 transition-colors cursor-pointer"
                      >
                        Criar Novo Usuário
                      </button>
                    </p>
                  </div>
                </motion.div>
              ) : authMode === 'register' ? (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6 relative z-10"
                >
                  <div>
                    <h2 className="text-2xl font-extrabold text-white light-theme:text-slate-800 tracking-tight leading-none">Criar Nova Conta</h2>
                    <p className="text-xs text-[#64748b] light-theme:text-slate-500 mt-2.5 leading-relaxed">Cadastre seu perfil de operador. A conta será ativa instantaneamente.</p>
                  </div>

                  {authError && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </motion.div>
                  )}
                  {authSuccess && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{authSuccess}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSignUp} className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-2.5 h-4 w-4 text-[#64748b]" />
                        <input
                          type="text"
                          required
                          placeholder="Seu nome"
                          value={regNome}
                          onChange={e => setRegNome(e.target.value)}
                          className="w-full bg-[#090b11]/80 light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-11 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">WhatsApp Celular</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-2.5 h-4 w-4 text-[#64748b]" />
                        <input
                          type="text"
                          required
                          placeholder="(11) 99999-9999"
                          value={regWhatsapp}
                          onChange={e => setRegWhatsapp(e.target.value)}
                          className="w-full bg-[#090b11]/80 light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-11 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-2.5 h-4 w-4 text-[#64748b]" />
                        <input
                          type="email"
                          required
                          placeholder="seuemail@exemplo.com"
                          value={regEmail}
                          onChange={e => setRegEmail(e.target.value)}
                          className="w-full bg-[#090b11]/80 light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-11 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">Senha</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-2.5 h-4 w-4 text-[#64748b]" />
                          <input
                            type="password"
                            required
                            placeholder="Mín. 6 caracteres"
                            value={regPassword}
                            onChange={e => setRegPassword(e.target.value)}
                            className="w-full bg-[#090b11]/80 light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-11 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">Confirmar Senha</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-2.5 h-4 w-4 text-[#64748b]" />
                          <input
                            type="password"
                            required
                            placeholder="Repita a senha"
                            value={regConfirmPassword}
                            onChange={e => setRegConfirmPassword(e.target.value)}
                            className="w-full bg-[#090b11]/80 light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-11 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={authSubmitting}
                      className="mt-2 w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white rounded-xl py-2.5 font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-900/30 transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {authSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <span>Cadastrar Operador</span>
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-1">
                    <p className="text-xs text-[#64748b]">
                      Já possui uma conta?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('login');
                          setAuthError(null);
                          setAuthSuccess(null);
                        }}
                        className="font-bold text-violet-400 hover:text-violet-300 light-theme:text-blue-600 light-theme:hover:text-blue-500 transition-colors cursor-pointer"
                      >
                        Fazer Login
                      </button>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="forgot"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6 relative z-10"
                >
                  <div>
                    <h2 className="text-2xl font-extrabold text-white light-theme:text-slate-800 tracking-tight leading-none">Recuperar Senha</h2>
                    <p className="text-xs text-[#64748b] light-theme:text-slate-500 mt-2.5 leading-relaxed">Digite seu e-mail cadastrado para receber instruções de recuperação da sua conta.</p>
                  </div>

                  {authError && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </motion.div>
                  )}
                  {authSuccess && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{authSuccess}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-[#64748b]" />
                        <input
                          type="email"
                          required
                          placeholder="seuemail@exemplo.com"
                          value={forgotEmail}
                          onChange={e => setForgotEmail(e.target.value)}
                          className="w-full bg-[#090b11]/80 light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={authSubmitting}
                      className="mt-2 w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white rounded-xl py-3 font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-900/30 transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {authSubmitting ? (
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      ) : (
                        <span>Enviar Instruções</span>
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setAuthError(null);
                        setAuthSuccess(null);
                      }}
                      className="text-xs font-bold text-violet-400 hover:text-violet-300 light-theme:text-blue-600 light-theme:hover:text-blue-500 transition-colors cursor-pointer"
                    >
                      Voltar para o Login
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  // Custom Dashboard Cards and Form states
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardType, setNewCardType] = useState('PIX');
  const [newCardName, setNewCardName] = useState('');
  const [dashboardCards, setDashboardCards] = useState([
    { id: '1', type: 'PIX', name: 'Caixa Geral (PIX)', balance: 48250.00, number: '•••• •••• •••• 4250', expiry: '12/32', color: 'from-violet-600 to-indigo-700 shadow-lg shadow-violet-900/30 border border-violet-500/20' },
    { id: '2', type: 'Dinheiro', name: 'Caixa Principal', balance: 12840.00, number: '•••• •••• •••• 8402', expiry: '06/30', color: 'from-cyan-500 to-blue-600 shadow-lg shadow-cyan-900/30 border border-cyan-500/20' },
    { id: '3', type: 'Cartão', name: 'Caixa Recebimentos', balance: 31420.00, number: '•••• •••• •••• 9104', expiry: '08/31', color: 'from-slate-800 to-slate-900 shadow-lg border border-slate-700/50' }
  ]);

  // Dark/Light Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Pessoas Data states
  const [bubbleData, setBubbleData] = useState<Pessoa[]>([]);
  const [supabaseData, setSupabaseData] = useState<Pessoa[]>([]);
  const [loadingBubble, setLoadingBubble] = useState(false);
  const [loadingSupabase, setLoadingSupabase] = useState(false);

  // Pessoas Filter/Search states
  const [searchBubble, setSearchBubble] = useState('');
  const [searchSupabase, setSearchSupabase] = useState('');

  // Pessoas CRUD states
  const [pessoaFormMode, setPessoaFormMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | null>(null);
  const [isExcluindoPessoa, setIsExcluindoPessoa] = useState<Pessoa | null>(null);
  const [isDeletingPessoa, setIsDeletingPessoa] = useState(false);
  const [formPessoaSubmitting, setFormPessoaSubmitting] = useState(false);
  const [formPessoaError, setFormPessoaError] = useState<string | null>(null);
  const [currentPagePessoas, setCurrentPagePessoas] = useState(1);

  // Pessoas Form states
  const [formPessoaNome, setFormPessoaNome] = useState('');
  const [formPessoaTipo, setFormPessoaTipo] = useState<string>('Cliente');
  const [formPessoaCelular, setFormPessoaCelular] = useState('');
  const [formPessoaCpf, setFormPessoaCpf] = useState('');
  const [formPessoaCnpj, setFormPessoaCnpj] = useState('');
  const [formPessoaCidade, setFormPessoaCidade] = useState('');
  const [formPessoaUf, setFormPessoaUf] = useState('');
  const [formPessoaAtivo, setFormPessoaAtivo] = useState(true);

  // Veiculos Data states
  const [bubbleVehicles, setBubbleVehicles] = useState<Veiculo[]>([]);
  const [supabaseVehicles, setSupabaseVehicles] = useState<Veiculo[]>([]);
  const [loadingBubbleVehicles, setLoadingBubbleVehicles] = useState(false);
  const [loadingSupabaseVehicles, setLoadingSupabaseVehicles] = useState(false);

  // Veiculos Filter/Search states
  const [searchBubbleVehicles, setSearchBubbleVehicles] = useState('');
  const [searchSupabaseVehicles, setSearchSupabaseVehicles] = useState('');

  // Veiculos CRUD states
  const [veiculoFormMode, setVeiculoFormMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);
  const [isExcluindoVeiculo, setIsExcluindoVeiculo] = useState<Veiculo | null>(null);
  const [isDeletingVeiculo, setIsDeletingVeiculo] = useState(false);
  const [formVeiculoSubmitting, setFormVeiculoSubmitting] = useState(false);
  const [formVeiculoError, setFormVeiculoError] = useState<string | null>(null);
  const [currentPageVeiculos, setCurrentPageVeiculos] = useState(1);

  // Veiculos Form inputs
  const [formVeiculoPlaca, setFormVeiculoPlaca] = useState('');
  const [formVeiculoMarcaModelo, setFormVeiculoMarcaModelo] = useState('');
  const [formVeiculoTipo, setFormVeiculoTipo] = useState('CARRETA');
  const [formVeiculoPessoaId, setFormVeiculoPessoaId] = useState(''); // Proprietário
  const [formVeiculoMotorista, setFormVeiculoMotorista] = useState(''); // Authorized Driver (comma-separated string)
  const [formVeiculoAtivo, setFormVeiculoAtivo] = useState(true);


  // Centro Custo Data states
  const [bubbleCentroCusto, setBubbleCentroCusto] = useState<CentroCusto[]>([]);
  const [supabaseCentroCusto, setSupabaseCentroCusto] = useState<CentroCusto[]>([]);
  const [loadingBubbleCentroCusto, setLoadingBubbleCentroCusto] = useState(false);
  const [loadingSupabaseCentroCusto, setLoadingSupabaseCentroCusto] = useState(false);

  // Centro Custo Filter/Search states
  const [searchBubbleCentroCusto, setSearchBubbleCentroCusto] = useState('');
  const [searchSupabaseCentroCusto, setSearchSupabaseCentroCusto] = useState('');

  // Centro Custo CRUD states
  const [centroCustoFormMode, setCentroCustoFormMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedCentroCusto, setSelectedCentroCusto] = useState<CentroCusto | null>(null);
  const [isExcluindoCentroCusto, setIsExcluindoCentroCusto] = useState<CentroCusto | null>(null);
  const [isDeletingCentroCusto, setIsDeletingCentroCusto] = useState(false);
  const [formCentroCustoSubmitting, setFormCentroCustoSubmitting] = useState(false);
  const [formCentroCustoError, setFormCentroCustoError] = useState<string | null>(null);
  const [currentPageCentroCusto, setCurrentPageCentroCusto] = useState(1);

  // Centro Custo Form inputs
  const [formCentroCustoNome, setFormCentroCustoNome] = useState('');
  const [formCentroCustoDescricao, setFormCentroCustoDescricao] = useState('');
  const [formCentroCustoTipoMovimentacao, setFormCentroCustoTipoMovimentacao] = useState('DESPESA');
  const [formCentroCustoTipoRecorrencia, setFormCentroCustoTipoRecorrencia] = useState('Não Informado');
  const [formCentroCustoValorProvisao, setFormCentroCustoValorProvisao] = useState<number>(0);
  const [formCentroCustoAtivo, setFormCentroCustoAtivo] = useState(true);

  // Forma Pagamento Data states
  const [bubbleFormaPagamento, setBubbleFormaPagamento] = useState<FormaPagamento[]>([]);
  const [supabaseFormaPagamento, setSupabaseFormaPagamento] = useState<FormaPagamento[]>([]);
  const [loadingBubbleFormaPagamento, setLoadingBubbleFormaPagamento] = useState(false);
  const [loadingSupabaseFormaPagamento, setLoadingSupabaseFormaPagamento] = useState(false);

  // Forma Pagamento Filter/Search states
  const [searchBubbleFormaPagamento, setSearchBubbleFormaPagamento] = useState('');
  const [searchSupabaseFormaPagamento, setSearchSupabaseFormaPagamento] = useState('');

  // Forma Pagamento CRUD states
  const [formaPagamentoFormMode, setFormaPagamentoFormMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedFormaPagamento, setSelectedFormaPagamento] = useState<FormaPagamento | null>(null);
  const [isExcluindoFormaPagamento, setIsExcluindoFormaPagamento] = useState<FormaPagamento | null>(null);
  const [isDeletingFormaPagamento, setIsDeletingFormaPagamento] = useState(false);
  const [formFormaPagamentoSubmitting, setFormFormaPagamentoSubmitting] = useState(false);
  const [formFormaPagamentoError, setFormFormaPagamentoError] = useState<string | null>(null);
  const [currentPageFormaPagamento, setCurrentPageFormaPagamento] = useState(1);

  // Forma Pagamento Form inputs
  const [formFormaPagamentoDescricao, setFormFormaPagamentoDescricao] = useState('');
  const [formFormaPagamentoTipoTransacao, setFormFormaPagamentoTipoTransacao] = useState('PIX');
  const [formFormaPagamentoAtivo, setFormFormaPagamentoAtivo] = useState(true);

  // Mensalistas Data states
  const [bubbleMensalistas, setBubbleMensalistas] = useState<Mensalista[]>([]);
  const [supabaseMensalistas, setSupabaseMensalistas] = useState<Mensalista[]>([]);
  const [loadingBubbleMensalistas, setLoadingBubbleMensalistas] = useState(false);
  const [loadingSupabaseMensalistas, setLoadingSupabaseMensalistas] = useState(false);

  // Mensalistas Filter/Search states
  const [searchBubbleMensalistas, setSearchBubbleMensalistas] = useState('');
  const [searchSupabaseMensalistas, setSearchSupabaseMensalistas] = useState('');

  // Mensalistas Parcelas Data states
  const [bubbleMensalistaParcelas, setBubbleMensalistaParcelas] = useState<MensalistaParcela[]>([]);
  const [supabaseMensalistaParcelas, setSupabaseMensalistaParcelas] = useState<MensalistaParcela[]>([]);
  const [loadingBubbleMensalistaParcelas, setLoadingBubbleMensalistaParcelas] = useState(false);
  const [loadingSupabaseMensalistaParcelas, setLoadingSupabaseMensalistaParcelas] = useState(false);

  // Mensalistas Parcelas Filter/Search states
  const [searchBubbleMensalistaParcelas, setSearchBubbleMensalistaParcelas] = useState('');
  const [searchSupabaseMensalistaParcelas, setSearchSupabaseMensalistaParcelas] = useState('');

  // Metas Data states
  const [bubbleMetas, setBubbleMetas] = useState<Meta[]>([]);
  const [supabaseMetas, setSupabaseMetas] = useState<Meta[]>([]);
  const [loadingBubbleMetas, setLoadingBubbleMetas] = useState(false);
  const [loadingSupabaseMetas, setLoadingSupabaseMetas] = useState(false);

  // Metas Filter/Search states
  const [searchBubbleMetas, setSearchBubbleMetas] = useState('');
  const [searchSupabaseMetas, setSearchSupabaseMetas] = useState('');

  // Despesas Data states
  const [bubbleDespesas, setBubbleDespesas] = useState<Despesa[]>([]);
  const [supabaseDespesas, setSupabaseDespesas] = useState<Despesa[]>([]);
  const [loadingBubbleDespesas, setLoadingBubbleDespesas] = useState(false);
  const [loadingSupabaseDespesas, setLoadingSupabaseDespesas] = useState(false);

  // Despesas Filter/Search states
  const [searchBubbleDespesas, setSearchBubbleDespesas] = useState('');
  const [searchSupabaseDespesas, setSearchSupabaseDespesas] = useState('');

  // States adicionais para o CRUD e Formulário de Despesas
  const [despesaFormMode, setDespesaFormMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedDespesa, setSelectedDespesa] = useState<Despesa | null>(null);
  const [isExcluindoDespesa, setIsExcluindoDespesa] = useState<Despesa | null>(null);
  const [isDeletingDespesa, setIsDeletingDespesa] = useState(false);

  // States do formulário de despesa
  const [formDataDespesa, setFormDataDespesa] = useState('');
  const [formDescricaoDespesa, setFormDescricaoDespesa] = useState('');
  const [formValorDespesa, setFormValorDespesa] = useState('');
  const [formValorProvisaoDespesa, setFormValorProvisaoDespesa] = useState('');
  const [formCentroCustoIdDespesa, setFormCentroCustoIdDespesa] = useState('');
  const [formFormaPagamentoIdDespesa, setFormFormaPagamentoIdDespesa] = useState('');

  const [formDespesaSubmitting, setFormDespesaSubmitting] = useState(false);
  const [formDespesaError, setFormDespesaError] = useState<string | null>(null);

  // States adicionais para o CRUD e Formulário de Mensalistas
  const [mensalistaFormMode, setMensalistaFormMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedMensalista, setSelectedMensalista] = useState<Mensalista | null>(null);
  const [isExcluindoMensalista, setIsExcluindoMensalista] = useState<Mensalista | null>(null);
  const [isDeletingMensalista, setIsDeletingMensalista] = useState(false);

  // Inputs do formulário de Mensalista
  const [formAtivoMensalista, setFormAtivoMensalista] = useState(true);
  const [formCentroCustoIdMensalista, setFormCentroCustoIdMensalista] = useState('');
  const [formDiaVencimentoMensalista, setFormDiaVencimentoMensalista] = useState('');
  const [formMarcaModeloMensalista, setFormMarcaModeloMensalista] = useState('');
  const [formNomePessoaMensalista, setFormNomePessoaMensalista] = useState('');
  const [formObservacaoMensalista, setFormObservacaoMensalista] = useState('');
  const [formPlacaMensalista, setFormPlacaMensalista] = useState('');
  const [formPlanoMensalista, setFormPlanoMensalista] = useState('Mensal VIP');
  const [formValorOriginalMensalista, setFormValorOriginalMensalista] = useState('');
  const [formVeiculoIdMensalista, setFormVeiculoIdMensalista] = useState('');

  const [formMensalistaSubmitting, setFormMensalistaSubmitting] = useState(false);
  const [formMensalistaError, setFormMensalistaError] = useState<string | null>(null);

  // Estados adicionais para Gerenciamento Financeiro (Parcelas)
  const [activeMensalistaFinanceiro, setActiveMensalistaFinanceiro] = useState<Mensalista | null>(null);
  const [isGeneratingParcelas, setIsGeneratingParcelas] = useState(false);
  const [isPayingParcela, setIsPayingParcela] = useState<MensalistaParcela | null>(null);

  // Inputs para Geração de Parcelas
  const [genQtyParcelas, setGenQtyParcelas] = useState(12);
  const [genValorParcela, setGenValorParcela] = useState('');
  const [genDiaVencimento, setGenDiaVencimento] = useState(10);
  const [genMesAnoInicio, setGenMesAnoInicio] = useState('');
  const [genSubmitting, setGenSubmitting] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  // Inputs para Baixa de Parcela
  const [payDataPagamento, setPayDataPagamento] = useState('');
  const [payValorPago, setPayValorPago] = useState('');
  const [payFormaPagamentoId, setPayFormaPagamentoId] = useState('');
  const [payCentroCustoId, setPayCentroCustoId] = useState('');
  const [paySubmitting, setPaySubmitting] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [isRevertingParcela, setIsRevertingParcela] = useState<any | null>(null);
  const [revertSubmitting, setRevertSubmitting] = useState(false);
  const [revertError, setRevertError] = useState<string | null>(null);

  // Entradas Data states
  const [bubbleEntradas, setBubbleEntradas] = useState<Entrada[]>([]);
  const [supabaseEntradas, setSupabaseEntradas] = useState<Entrada[]>([]);
  const [loadingBubbleEntradas, setLoadingBubbleEntradas] = useState(false);
  const [loadingSupabaseEntradas, setLoadingSupabaseEntradas] = useState(false);

  // Entradas Filter/Search states
  const [searchBubbleEntradas, setSearchBubbleEntradas] = useState('');
  const [searchSupabaseEntradas, setSearchSupabaseEntradas] = useState('');

  // Filtros por período para Supabase (Entradas, Despesas, Mensalistas)
  const [periodoInicioEntradas, setPeriodoInicioEntradas] = useState('');
  const [periodoFimEntradas, setPeriodoFimEntradas] = useState('');
  const [currentPageEntradas, setCurrentPageEntradas] = useState(1);
  const [selectedCentroCustoEntradas, setSelectedCentroCustoEntradas] = useState('');

  // States adicionais para o CRUD e Formulário de Entradas
  const [entradaFormMode, setEntradaFormMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedEntrada, setSelectedEntrada] = useState<Entrada | null>(null);
  const [isExcluindoEntrada, setIsExcluindoEntrada] = useState<Entrada | null>(null);
  const [isDeletingEntrada, setIsDeletingEntrada] = useState(false);

  // States do formulário de entrada
  const [formDataEntrada, setFormDataEntrada] = useState('');
  const [formDescricaoEntrada, setFormDescricaoEntrada] = useState('');
  const [formValorEntrada, setFormValorEntrada] = useState('');
  const [formCentroCustoId, setFormCentroCustoId] = useState('');
  const [formFormaPagamentoId, setFormFormaPagamentoId] = useState('');
  const [formPessoaId, setFormPessoaId] = useState('');
  const [formVeiculoId, setFormVeiculoId] = useState('');
  const [formPlacaVeiculo, setFormPlacaVeiculo] = useState('');

  const [formEntradaSubmitting, setFormEntradaSubmitting] = useState(false);
  const [formEntradaError, setFormEntradaError] = useState<string | null>(null);

  const getInitialDespesasDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
    return {
      start: `${year}-${month}-01`,
      end: `${year}-${month}-${String(lastDay).padStart(2, '0')}`
    };
  };

  const initialDespesasDates = getInitialDespesasDates();
  const [periodoInicioDespesas, setPeriodoInicioDespesas] = useState(initialDespesasDates.start);
  const [periodoFimDespesas, setPeriodoFimDespesas] = useState(initialDespesasDates.end);
  const [currentPageDespesas, setCurrentPageDespesas] = useState(1);
  const [selectedCentroCustoDespesas, setSelectedCentroCustoDespesas] = useState('');

  const [periodoInicioMensalistas, setPeriodoInicioMensalistas] = useState('');
  const [periodoFimMensalistas, setPeriodoFimMensalistas] = useState('');

  // Modal & Migration states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [migratedCount, setMigratedCount] = useState(0);
  const [totalToMigrate, setTotalToMigrate] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // DB wipe verification state
  const [isConfirmingWipe, setIsConfirmingWipe] = useState(false);
  const [wiping, setWiping] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ==========================================
  // ENOLI DESIGN SYSTEM - CUSTOM RENDER VIEWS
  // ==========================================

  const renderSidebar = () => {
    return (
      <aside className="w-64 flex-shrink-0 bg-[#0e111a] light-theme:bg-[#18224f] border-r border-[#1f2433] light-theme:border-[#242f63]/50 flex flex-col h-screen select-none relative z-20">
        {/* Top Branding Section */}
        <div className="px-6 h-20 border-b border-[#1f2433] light-theme:border-[#242f63]/50 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-900/20 shadow-sm">
            <Truck className="h-5.5 w-5.5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-white light-theme:text-white text-base tracking-wide flex items-center gap-1.5 leading-none">
              LavajatoBR050
              <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
            </h1>
            <p className="text-[#64748b] light-theme:text-[#8fa0dd]/70 text-[10px] uppercase font-bold tracking-widest mt-1.5 leading-none">Gestão Financeira</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          {/* Visão Geral */}
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all relative overflow-hidden group ${currentTab === 'dashboard'
                ? 'text-white light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/10 light-theme:border-transparent'
                : 'text-[#94a3b8] hover:text-white light-theme:text-[#8fa0dd] light-theme:hover:text-white hover:bg-white/5 light-theme:hover:bg-white/5 border border-transparent'
              }`}
          >
            {currentTab === 'dashboard' && (
              <motion.div
                layoutId="sidebar-active-indicator"
                className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-y from-violet-500 to-cyan-400 rounded-r"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <LayoutDashboard className={`h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110 ${currentTab === 'dashboard' ? 'text-cyan-400 light-theme:text-white' : 'text-[#64748b] light-theme:text-[#7a8bb8] group-hover:text-[#94a3b8] light-theme:group-hover:text-white'}`} />
            <span>Visão Geral</span>
          </button>

          {/* Lançamentos Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => {
                const nextState = !isLancamentosOpen;
                setIsLancamentosOpen(nextState);
                if (nextState) {
                  setIsCadastrosOpen(false);
                  setIsConfigOpen(false);
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${['entradas', 'despesas', 'mensalistas'].includes(currentTab)
                  ? 'text-white light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/10 light-theme:border-transparent'
                  : 'text-[#94a3b8] hover:text-white light-theme:text-[#8fa0dd] light-theme:hover:text-white hover:bg-white/5 light-theme:hover:bg-white/5 border border-transparent'
                }`}
            >
              <div className="flex items-center gap-3">
                <ArrowRightLeft className={`h-4.5 w-4.5 transition-transform ${['entradas', 'despesas', 'mensalistas'].includes(currentTab) ? 'text-cyan-400 light-theme:text-white' : 'text-[#64748b] light-theme:text-[#7a8bb8]'}`} />
                <span>Lançamentos</span>
              </div>
              {isLancamentosOpen ? (
                <ChevronDown className="h-3.5 w-3.5 text-[#64748b] light-theme:text-[#7a8bb8]" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-[#64748b] light-theme:text-[#7a8bb8]" />
              )}
            </button>

            <AnimatePresence>
              {isLancamentosOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-9 space-y-1 overflow-hidden"
                >
                  {/* Entradas */}
                  <button
                    onClick={() => setCurrentTab('entradas')}
                    className={`w-full flex items-center justify-start text-left gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${currentTab === 'entradas'
                        ? 'text-cyan-400 light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/5 light-theme:border-transparent'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5 light-theme:text-[#8fa0dd] light-theme:hover:text-white'
                      }`}
                  >
                    <ArrowUpRight className="h-4.5 w-4.5" />
                    <span>Entradas</span>
                  </button>

                  {/* Despesas */}
                  <button
                    onClick={() => setCurrentTab('despesas')}
                    className={`w-full flex items-center justify-start text-left gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${currentTab === 'despesas'
                        ? 'text-cyan-400 light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/5 light-theme:border-transparent'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5 light-theme:text-[#8fa0dd] light-theme:hover:text-white'
                      }`}
                  >
                    <ArrowDownRight className="h-4.5 w-4.5" />
                    <span>Despesas</span>
                  </button>

                  {/* Mensalistas */}
                  <button
                    onClick={() => setCurrentTab('mensalistas')}
                    className={`w-full flex items-center justify-start text-left gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${currentTab === 'mensalistas'
                        ? 'text-cyan-400 light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/5 light-theme:border-transparent'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5 light-theme:text-[#8fa0dd] light-theme:hover:text-white'
                      }`}
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    <span>Mensalistas</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cadastros Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => {
                const nextState = !isCadastrosOpen;
                setIsCadastrosOpen(nextState);
                if (nextState) {
                  setIsLancamentosOpen(false);
                  setIsConfigOpen(false);
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${['pessoas', 'veiculos', 'formapagamento', 'centrocusto'].includes(currentTab)
                  ? 'text-white light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/10 light-theme:border-transparent'
                  : 'text-[#94a3b8] hover:text-white light-theme:text-[#8fa0dd] light-theme:hover:text-white hover:bg-white/5 light-theme:hover:bg-white/5 border border-transparent'
                }`}
            >
              <div className="flex items-center gap-3">
                <Database className={`h-4.5 w-4.5 transition-transform ${['pessoas', 'veiculos', 'formapagamento', 'centrocusto'].includes(currentTab) ? 'text-cyan-400 light-theme:text-white' : 'text-[#64748b] light-theme:text-[#7a8bb8]'}`} />
                <span>Cadastros</span>
              </div>
              {isCadastrosOpen ? (
                <ChevronDown className="h-3.5 w-3.5 text-[#64748b] light-theme:text-[#7a8bb8]" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-[#64748b] light-theme:text-[#7a8bb8]" />
              )}
            </button>

            <AnimatePresence>
              {isCadastrosOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-9 space-y-1 overflow-hidden"
                >
                  {/* Pessoas */}
                  <button
                    onClick={() => setCurrentTab('pessoas')}
                    className={`w-full flex items-center justify-start text-left gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${currentTab === 'pessoas'
                        ? 'text-cyan-400 light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/5 light-theme:border-transparent'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5 light-theme:text-[#8fa0dd] light-theme:hover:text-white'
                      }`}
                  >
                    <Users className="h-4.5 w-4.5" />
                    <span>Pessoas</span>
                  </button>

                  {/* Veículos */}
                  <button
                    onClick={() => setCurrentTab('veiculos')}
                    className={`w-full flex items-center justify-start text-left gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${currentTab === 'veiculos'
                        ? 'text-cyan-400 light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/5 light-theme:border-transparent'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5 light-theme:text-[#8fa0dd] light-theme:hover:text-white'
                      }`}
                  >
                    <Car className="h-4.5 w-4.5" />
                    <span>Veículos</span>
                  </button>

                  {/* Formas de Pagamento */}
                  <button
                    onClick={() => setCurrentTab('formapagamento')}
                    className={`w-full flex items-center justify-start text-left gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${currentTab === 'formapagamento'
                        ? 'text-cyan-400 light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/5 light-theme:border-transparent'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5 light-theme:text-[#8fa0dd] light-theme:hover:text-white'
                      }`}
                  >
                    <Wallet className="h-4.5 w-4.5" />
                    <span>Formas de Pagamento</span>
                  </button>

                  {/* Centro de Custos */}
                  <button
                    onClick={() => setCurrentTab('centrocusto')}
                    className={`w-full flex items-center justify-start text-left gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${currentTab === 'centrocusto'
                        ? 'text-cyan-400 light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/5 light-theme:border-transparent'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5 light-theme:text-[#8fa0dd] light-theme:hover:text-white'
                      }`}
                  >
                    <Layers className="h-4.5 w-4.5" />
                    <span>Centro de Custos</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ordem de Serviço */}
          <button
            onClick={() => setCurrentTab('ordemservico')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all relative overflow-hidden group ${currentTab === 'ordemservico'
                ? 'text-white light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/10 light-theme:border-transparent'
                : 'text-[#94a3b8] hover:text-white light-theme:text-[#8fa0dd] light-theme:hover:text-white hover:bg-white/5 light-theme:hover:bg-white/5 border border-transparent'
              }`}
          >
            {currentTab === 'ordemservico' && (
              <motion.div
                layoutId="sidebar-active-indicator"
                className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-y from-violet-500 to-cyan-400 rounded-r"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Wrench className={`h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110 ${currentTab === 'ordemservico' ? 'text-cyan-400 light-theme:text-white' : 'text-[#64748b] light-theme:text-[#7a8bb8] group-hover:text-[#94a3b8] light-theme:group-hover:text-white'}`} />
            <span>Ordem de Serviços</span>
          </button>

          {/* Laudo de Higienização */}
          <button
            onClick={() => setCurrentTab('laudo')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all relative overflow-hidden group ${currentTab === 'laudo'
                ? 'text-white light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/10 light-theme:border-transparent'
                : 'text-[#94a3b8] hover:text-white light-theme:text-[#8fa0dd] light-theme:hover:text-white hover:bg-white/5 light-theme:hover:bg-white/5 border border-transparent'
              }`}
          >
            {currentTab === 'laudo' && (
              <motion.div
                layoutId="sidebar-active-indicator"
                className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-y from-violet-500 to-cyan-400 rounded-r"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <FileText className={`h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110 ${currentTab === 'laudo' ? 'text-cyan-400 light-theme:text-white' : 'text-[#64748b] light-theme:text-[#7a8bb8] group-hover:text-[#94a3b8] light-theme:group-hover:text-white'}`} />
            <span>Laudo de Higienização</span>
          </button>

          {/* Configurações Dropdown Item */}
          <div className="space-y-1">
            <button
              onClick={() => {
                const nextState = !isConfigOpen;
                setIsConfigOpen(nextState);
                if (nextState) {
                  setIsLancamentosOpen(false);
                  setIsCadastrosOpen(false);
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${currentTab === 'migracoes'
                  ? 'text-white light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/10 light-theme:border-transparent'
                  : 'text-[#94a3b8] hover:text-white light-theme:text-[#8fa0dd] light-theme:hover:text-white hover:bg-white/5 light-theme:hover:bg-white/5 border border-transparent'
                }`}
            >
              <div className="flex items-center gap-3">
                <Settings className={`h-4.5 w-4.5 ${currentTab === 'migracoes' ? 'text-cyan-400 light-theme:text-white' : 'text-[#64748b] light-theme:text-[#7a8bb8]'}`} />
                <span>Configurações</span>
              </div>
              {isConfigOpen ? (
                <ChevronDown className="h-3.5 w-3.5 text-[#64748b] light-theme:text-[#7a8bb8]" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-[#64748b] light-theme:text-[#7a8bb8]" />
              )}
            </button>

            <AnimatePresence>
              {(isConfigOpen || currentTab === 'migracoes') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-9 overflow-hidden"
                >
                  <button
                    onClick={() => setCurrentTab('migracoes')}
                    className={`w-full flex items-center justify-start text-left gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${currentTab === 'migracoes'
                        ? 'text-cyan-400 light-theme:text-white bg-white/5 light-theme:bg-white/10 border border-white/5 light-theme:border-transparent'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5 light-theme:text-[#8fa0dd] light-theme:hover:text-white'
                      }`}
                  >
                    <Cloud className="h-4.5 w-4.5" />
                    <span>Migrações Bubble.io</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Promotion card at bottom */}
        <div className="p-4 border-t border-[#1f2433] light-theme:border-[#242f63]/50">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-900/60 to-indigo-950/40 light-theme:bg-gradient-to-br light-theme:from-violet-600/25 light-theme:to-cyan-500/20 border border-violet-500/20 light-theme:border-violet-500/30 relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-20 h-20 bg-violet-600/10 rounded-full blur-xl group-hover:scale-125 transition-transform" />
            <div className="relative z-10 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-violet-400 light-theme:text-cyan-300 uppercase tracking-widest flex items-center gap-1">
                <Award className="h-3.5 w-3.5" />
                TECHNOCODE Soluções
              </span>
              <p className="text-xs text-[#94a3b8] light-theme:text-slate-200/90 leading-relaxed">
                Automação inteligente e controle total da sua frota em uma única plataforma de alta performance.
              </p>
              <button
                type="button"
                onClick={() => alert("Obrigado pelo interesse! Esta funcionalidade está sendo preparada em conjunto com sua integração n8n.")}
                className="mt-1 w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white rounded-lg py-1.5 font-bold text-[10px] uppercase tracking-wider shadow-lg shadow-violet-900/30 light-theme:shadow-indigo-950/50 transition-transform active:scale-95"
              >
                Saber Mais
              </button>
            </div>
          </div>

          {/* Logout & Profile summary */}
          <div className="flex items-center justify-between mt-4 px-2 w-full border-t border-[#1f2433] light-theme:border-[#242f63]/50 pt-3.5 gap-2">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 light-theme:bg-slate-100 light-theme:hover:bg-slate-200 light-theme:border-slate-200 text-white light-theme:text-slate-700 font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
              title="Sair da Conta"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sair</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-8 w-14 rounded-full bg-transparent border border-[#2a324d] light-theme:border-[#263366] p-1 flex items-center justify-between cursor-pointer relative transition-colors duration-300 flex-shrink-0"
            >
              <motion.div
                layout
                className="absolute h-5 w-5 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 light-theme:from-amber-400 light-theme:to-orange-500 shadow-md flex items-center justify-center"
                style={{ left: theme === 'dark' ? '4px' : '30px' }}
              >
                {theme === 'dark' ? (
                  <Moon className="h-3 w-3 text-white" />
                ) : (
                  <Sun className="h-3 w-3 text-white" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </aside>
    );
  };

  const renderHeader = () => {
    const getTabTitle = () => {
      switch (currentTab) {
        case 'dashboard': return 'Visão Geral / Dashboard';
        case 'entradas': return 'Entradas / Receitas';
        case 'despesas': return 'Despesas / Custos';
        case 'mensalistas': return 'Mensalistas / Planos';
        case 'pessoas': return 'Pessoas / Clientes';
        case 'veiculos': return 'Veículos Cadastrados';
        case 'formapagamento': return 'Formas de Pagamento';
        case 'centrocusto': return 'Centro de Custos';
        case 'ordemservico': return 'Ordens de Serviço';
        case 'migracoes': return 'Migração de Dados (Bubble ➔ Supabase)';
        case 'laudo': return 'Laudo de Higienização';
        default: return 'LavajatoBR050';
      }
    };

    const getTabSubtitle = () => {
      switch (currentTab) {
        case 'dashboard': return 'Resumo operacional, caixas ativos e análises de fluxo.';
        case 'entradas': return 'Listagem e controle de receitas registradas.';
        case 'despesas': return 'Controle de custos, provisões e contas a pagar.';
        case 'mensalistas': return 'Gestão de mensalistas, placas vinculadas e mensalidades.';
        case 'pessoas': return 'Diretório completo de pessoas físicas e jurídicas no Supabase.';
        case 'veiculos': return 'Frota de veículos, motoristas e categorias de lavagem.';
        case 'formapagamento': return 'Métodos de pagamento aceitos e configurados.';
        case 'centrocusto': return 'Centros de custos fixos, variáveis e provisionamento.';
        case 'ordemservico': return 'Quadro Kanban de ordens de serviço ativas na rampa.';
        case 'migracoes': return 'Importação de tabelas legadas do Bubble.io para produção.';
        case 'laudo': return 'Gerenciamento e emissão de laudos de higienização detalhados.';
        default: return 'Painel de Gestão Operacional';
      }
    };

    return (
      <header className="px-8 h-20 bg-[#090b11]/80 light-theme:bg-white/80 border-b border-[#1f2433] light-theme:border-slate-200 backdrop-blur-md flex items-center justify-between z-10">
        <div>
          <h2 className="text-xl font-bold text-white light-theme:text-slate-800 tracking-tight flex items-center gap-2 leading-none">
            {getTabTitle()}
          </h2>
          <p className="text-xxs text-[#94a3b8] light-theme:text-slate-500 mt-1.5 leading-none">{getTabSubtitle()}</p>
        </div>

        {/* Actions/Profile Right */}
        <div className="flex items-center gap-4">
          {/* Search bar */}
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar no sistema..."
              className="w-full bg-[#0e111a] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 light-theme:focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Quick Info Notification Button */}
          <button className="h-9 w-9 rounded-xl bg-[#0e111a] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 flex items-center justify-center hover:bg-white/5 light-theme:hover:bg-slate-200 transition-colors relative group">
            <Bell className="h-4.5 w-4.5 text-[#94a3b8] light-theme:text-slate-600 group-hover:text-white light-theme:group-hover:text-slate-800" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400" />
          </button>

          {/* User profile capsule */}
          <div className="flex items-center gap-3 pl-3 border-l border-[#1f2433] light-theme:border-slate-200">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs tracking-wide shadow-md shadow-violet-900/20 uppercase" title={userProfile?.nome_completo || session?.user?.email}>
              {userProfile?.nome_completo
                ? userProfile.nome_completo.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                : session?.user?.email?.slice(0, 2).toUpperCase() || 'US'}
            </div>
            <div className="hidden sm:block">
              <h4 className="text-xs font-bold text-white light-theme:text-slate-800 leading-none">
                {userProfile?.nome_completo || session?.user?.user_metadata?.nome_completo || session?.user?.email?.split('@')[0] || 'Operador'}
              </h4>
              <p className="text-[10px] text-[#64748b] font-medium mt-1 leading-none">
                {userProfile?.role === 'admin' ? 'Administrador' : userProfile?.role === 'client' ? 'Cliente' : 'Operador'}
              </p>
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderLaudo = () => {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-900/20">
          <FileText className="h-8 w-8 text-white animate-pulse" />
        </div>
        <div className="text-center max-w-md flex flex-col gap-2">
          <h3 className="text-lg font-bold text-white light-theme:text-slate-800">Laudo de Higienização</h3>
          <p className="text-xs text-[#94a3b8] light-theme:text-slate-500 leading-relaxed">
            Esta funcionalidade está sendo preparada para conectar-se diretamente às suas ordens de serviço. Em breve você poderá emitir laudos técnicos detalhados com fotos e certificações.
          </p>
        </div>
      </div>
    );
  };

  const getCashflowData = () => {
    const months = ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
    const entradas = [28000, 35000, 31000, 42000, 39000, 48250];
    const despesas = [18000, 22000, 19500, 24000, 21000, 26400];

    if (supabaseEntradas.length > 0) {
      const totalEntradas = supabaseEntradas.reduce((acc, curr) => acc + (curr.valor || 0), 0);
      const totalDespesas = supabaseDespesas.reduce((acc, curr) => acc + (curr.valor || 0), 0);
      if (totalEntradas > 0) {
        entradas[5] = totalEntradas;
      }
      if (totalDespesas > 0) {
        despesas[5] = totalDespesas;
      }
    }

    return { months, entradas, despesas };
  };

  const renderDashboard = () => {
    const { months, entradas, despesas } = getCashflowData();
    const maxVal = Math.max(...entradas, ...despesas, 10000) * 1.15;

    const getSvgCoords = (data: number[]) => {
      return data.map((val, idx) => {
        const x = (idx / (data.length - 1)) * 380 + 30;
        const y = 160 - (val / maxVal) * 120;
        return { x, y };
      });
    };

    const coordsEntradas = getSvgCoords(entradas);
    const coordsDespesas = getSvgCoords(despesas);

    const getBezierPath = (coords: { x: number, y: number }[]) => {
      let path = `M ${coords[0].x} ${coords[0].y}`;
      for (let i = 0; i < coords.length - 1; i++) {
        const cp1x = coords[i].x + 40;
        const cp1y = coords[i].y;
        const cp2x = coords[i + 1].x - 40;
        const cp2y = coords[i + 1].y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${coords[i + 1].x} ${coords[i + 1].y}`;
      }
      return path;
    };

    const pathEntradas = getBezierPath(coordsEntradas);
    const pathDespesas = getBezierPath(coordsDespesas);

    const fillEntradas = `${pathEntradas} L ${coordsEntradas[coordsEntradas.length - 1].x} 170 L ${coordsEntradas[0].x} 170 Z`;
    const fillDespesas = `${pathDespesas} L ${coordsDespesas[coordsDespesas.length - 1].x} 170 L ${coordsDespesas[0].x} 170 Z`;

    const combinedTransactions = [
      ...supabaseEntradas.map(item => ({
        id: `ent-${item.id}`,
        type: 'entrada' as const,
        description: item.descricao_entrada || 'Serviço Lavagem',
        category: item.descricao_forma_pagamento || 'PIX',
        date: item.data_entrada ? new Date(item.data_entrada) : new Date(),
        value: item.valor || 0,
        badge: 'Recebido'
      })),
      ...supabaseDespesas.map(item => ({
        id: `des-${item.id}`,
        type: 'despesa' as const,
        description: item.nome_centro_custos || 'Operação',
        category: item.descricao_forma_pagamento || 'Dinheiro',
        date: item.data_despesa ? new Date(item.data_despesa) : new Date(),
        value: item.valor || 0,
        badge: 'Pago'
      }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

    const transactionsToDisplay = combinedTransactions.length > 0 ? combinedTransactions : [
      { id: '1', type: 'entrada' as const, description: 'Polimento Especial + Selante (Civic)', category: 'PIX', date: new Date(), value: 350.00, badge: 'Recebido' },
      { id: '2', type: 'despesa' as const, description: 'Shampoo Neutro 20L + Microfibras', category: 'PIX', date: new Date(Date.now() - 4 * 3600000), value: 240.00, badge: 'Pago' },
      { id: '3', type: 'entrada' as const, description: 'Lavagem Completa (Corolla Placa BRA)', category: 'Dinheiro', date: new Date(Date.now() - 24 * 3600000), value: 90.00, badge: 'Recebido' },
      { id: '4', type: 'despesa' as const, description: 'Comissão Lavador Juninho', category: 'PIX', date: new Date(Date.now() - 36 * 3600000), value: 120.00, badge: 'Pago' },
      { id: '5', type: 'entrada' as const, description: 'Mensalidade Assinatura Plano VIP', category: 'Cartão', date: new Date(Date.now() - 48 * 3600000), value: 280.00, badge: 'Recebido' },
    ];

    const totalDespesasVal = supabaseDespesas.reduce((acc, curr) => acc + (curr.valor || 0), 0);
    const costBreakdown = [
      { name: 'Produtos / Insumos', val: 35, color: '#10b981', amount: totalDespesasVal > 0 ? totalDespesasVal * 0.35 : 1240 },
      { name: 'Salários / Comissões', val: 45, color: '#8b5cf6', amount: totalDespesasVal > 0 ? totalDespesasVal * 0.45 : 1600 },
      { name: 'Aluguel / Operacional', val: 20, color: '#06b6d4', amount: totalDespesasVal > 0 ? totalDespesasVal * 0.20 : 710 },
    ];

    const handleAddCard = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newCardName || !newCardNumber) {
        alert("Preencha todos os campos do Caixa!");
        return;
      }

      const newCard = {
        id: (dashboardCards.length + 1).toString(),
        type: newCardType,
        name: newCardName,
        balance: 0.00,
        number: `•••• •••• •••• ${newCardNumber.slice(-4) || '0000'}`,
        expiry: newCardExpiry || '12/30',
        color: newCardType === 'PIX' ? 'from-purple-600 to-indigo-700 shadow-lg border border-purple-500/20' : newCardType === 'Dinheiro' ? 'from-cyan-500 to-blue-600 shadow-lg border border-cyan-500/20' : 'from-slate-800 to-slate-900 border border-slate-700/50'
      };

      setDashboardCards([...dashboardCards, newCard]);
      setNewCardName('');
      setNewCardNumber('');
      setNewCardExpiry('');
      alert(`Caixa "${newCardName}" adicionado com sucesso!`);
    };

    return (
      <div className="h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6 w-full">
        {/* Top Operational Cards Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 h-10 w-10 bg-emerald-500/5 rounded-tl-3xl pointer-events-none group-hover:scale-150 transition-transform" />
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider block leading-none">Faturamento Geral</span>
              <h3 className="text-base font-extrabold text-white light-theme:text-slate-800 mt-2 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(supabaseEntradas.reduce((acc, curr) => acc + (curr.valor || 0), 0) || 92510)}
              </h3>
              <p className="text-[9px] text-[#64748b] mt-2 font-medium leading-none"><span className="text-emerald-400 font-bold">✔️ {supabaseEntradas.length}</span> entradas no total</p>
            </div>
          </div>

          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 h-10 w-10 bg-rose-500/5 rounded-tl-3xl pointer-events-none group-hover:scale-150 transition-transform" />
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 flex-shrink-0">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider block leading-none">Custos Totais</span>
              <h3 className="text-base font-extrabold text-white light-theme:text-slate-800 mt-2 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(supabaseDespesas.reduce((acc, curr) => acc + (curr.valor || 0), 0) || 35500)}
              </h3>
              <p className="text-[9px] text-[#64748b] mt-2 font-medium leading-none"><span className="text-rose-400 font-bold">❌ {supabaseDespesas.length}</span> despesas no total</p>
            </div>
          </div>

          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 h-10 w-10 bg-violet-500/5 rounded-tl-3xl pointer-events-none group-hover:scale-150 transition-transform" />
            <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider block leading-none">Mensalistas Vip</span>
              <h3 className="text-base font-extrabold text-white light-theme:text-slate-800 mt-2 leading-none">
                {supabaseMensalistas.filter(m => m.ativo).length || 24} Ativos
              </h3>
              <p className="text-[9px] text-[#64748b] mt-2 font-medium leading-none">De {supabaseMensalistas.length || 28} cadastrados no banco</p>
            </div>
          </div>

          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 h-10 w-10 bg-cyan-500/5 rounded-tl-3xl pointer-events-none group-hover:scale-150 transition-transform" />
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider block leading-none">Veículos Cadastrados</span>
              <h3 className="text-base font-extrabold text-white light-theme:text-slate-800 mt-2 leading-none">
                {supabaseVehicles.length || 42} Veículos
              </h3>
              <p className="text-[9px] text-[#64748b] mt-2 font-medium leading-none"><span className="text-cyan-400 font-bold">🚙 {supabaseVehicles.filter(v => v.ativo).length || 38}</span> operacionais</p>
            </div>
          </div>
        </div>

        {/* 3-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {/* Main 2-column block */}
          <div className="lg:col-span-2 flex flex-col gap-6">


            {/* Cash Flow Line Chart */}
            <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800 leading-none">Fluxo Operacional (Últimos 6 meses)</h3>
                  <p className="text-[10px] text-[#64748b] mt-1.5 leading-none">Demonstrativo comparativo de Receitas vs Despesas em tempo real.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Entradas</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span>Despesas</span>
                  </div>
                </div>
              </div>

              {/* Pure SVG Wave Chart */}
              <div className="relative h-44 w-full bg-[#090b11]/40 light-theme:bg-slate-50/50 rounded-xl overflow-hidden border border-[#1f2433]/50 light-theme:border-slate-100 flex items-center justify-center p-2">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="glowEntradas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="glowDespesas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <line x1="20" y1="30" x2="480" y2="30" stroke="#1f2433" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="20" y1="80" x2="480" y2="80" stroke="#1f2433" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="20" y1="130" x2="480" y2="130" stroke="#1f2433" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="20" y1="170" x2="480" y2="170" stroke="#1f2433" strokeOpacity="0.4" strokeWidth="1" />

                  <path d={fillEntradas} fill="url(#glowEntradas)" />
                  <path d={fillDespesas} fill="url(#glowDespesas)" />

                  <path d={pathEntradas} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                  <path d={pathDespesas} fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />

                  {coordsEntradas.map((pt, i) => (
                    <g key={`ent-pt-${i}`}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#10b981" className="hover:scale-150 transition-transform cursor-pointer" />
                      <circle cx={pt.x} cy={pt.y} r="8" stroke="#10b981" strokeOpacity="0.3" fill="none" />
                    </g>
                  ))}
                  {coordsDespesas.map((pt, i) => (
                    <g key={`des-pt-${i}`}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#f43f5e" className="hover:scale-150 transition-transform cursor-pointer" />
                      <circle cx={pt.x} cy={pt.y} r="8" stroke="#f43f5e" strokeOpacity="0.3" fill="none" />
                    </g>
                  ))}
                </svg>

                <div className="absolute bottom-2 left-6 right-6 flex justify-between px-1 text-[9px] text-[#64748b] font-bold">
                  {months.map((m, idx) => (
                    <span key={idx}>{m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* List Section: Últimas Transações */}
            <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800 leading-none">Últimas Transações</h3>
                  <p className="text-[10px] text-[#64748b] mt-1.5 leading-none">Histórico financeiro consolidado de entradas e despesas.</p>
                </div>
                <button type="button" onClick={() => setCurrentTab('entradas')} className="text-xs text-[#94a3b8] hover:text-white transition-colors">Ver Histórico Completo</button>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#1f2433] light-theme:border-slate-100 text-[10px] text-[#64748b] uppercase tracking-wider font-bold">
                      <th className="pb-3">Descrição / Item</th>
                      <th className="pb-3">Categoria</th>
                      <th className="pb-3">Data</th>
                      <th className="pb-3 text-right">Valor</th>
                      <th className="pb-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                    {transactionsToDisplay.map(item => (
                      <tr key={item.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                        <td className="py-3 font-semibold text-white light-theme:text-slate-800 flex items-center gap-2">
                          <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 ${item.type === 'entrada' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {item.type === 'entrada' ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                          </div>
                          <span className="truncate max-w-[200px]">{item.description}</span>
                        </td>
                        <td className="py-3 font-medium text-slate-300 light-theme:text-slate-500">{item.category}</td>
                        <td className="py-3 font-medium text-[#64748b]">{item.date.toLocaleDateString('pt-BR')}</td>
                        <td className={`py-3 text-right font-bold ${item.type === 'entrada' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {item.type === 'entrada' ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}
                        </td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.type === 'entrada'
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                            }`}>
                            {item.badge}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right sidebar column: stats + new card form */}
          <div className="flex flex-col gap-6 w-full">

            {/* Apple Activity concentric rings breakdown */}
            <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col gap-5">
              <div>
                <h3 className="text-sm font-bold text-white light-theme:text-slate-800 leading-none">Distribuição de Gastos</h3>
                <p className="text-[10px] text-[#64748b] mt-1.5 leading-none font-medium">Divisão proporcional das despesas no caixa.</p>
              </div>

              <div className="flex flex-col items-center justify-center p-3 relative bg-[#090b11]/30 light-theme:bg-slate-50 rounded-xl border border-[#1f2433]/50 light-theme:border-slate-100">
                <svg className="w-36 h-36" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#1f2433" strokeOpacity="0.1" strokeWidth="6" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#1f2433" strokeOpacity="0.1" strokeWidth="6" />
                  <circle cx="50" cy="50" r="22" fill="none" stroke="#1f2433" strokeOpacity="0.1" strokeWidth="6" />

                  <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="83.56 238.76" strokeLinecap="round" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="84.82 188.5" strokeLinecap="round" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="22" fill="none" stroke="#06b6d4" strokeWidth="6" strokeDasharray="27.64 138.23" strokeLinecap="round" transform="rotate(-90 50 50)" />
                </svg>

                <div className="w-full mt-4 flex flex-col gap-2 border-t border-[#1f2433] light-theme:border-slate-200 pt-3 text-xxs font-medium text-[#94a3b8] light-theme:text-slate-600">
                  {costBreakdown.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <div className="font-bold text-white light-theme:text-slate-800">
                        {item.val}% ({new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(item.amount)})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Create New Card */}
            <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-bold text-white light-theme:text-slate-800 leading-none">Criar Novo Caixa / Cartão</h3>
                <p className="text-[10px] text-[#64748b] mt-1.5 leading-none">Cadastre um novo caixa de recebimento ou conta corrente.</p>
              </div>

              <form onSubmit={handleAddCard} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">Nome da Carteira / Caixa</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Caixa Geral Principal"
                    value={newCardName}
                    onChange={e => setNewCardName(e.target.value)}
                    className="bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-4 py-2 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">Número do Caixa / Identificador</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="4000 1234 5678 9010"
                    value={newCardNumber}
                    onChange={e => setNewCardNumber(e.target.value)}
                    className="bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-4 py-2 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">Validade (MM/AA)</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="12/32"
                      value={newCardExpiry}
                      onChange={e => setNewCardExpiry(e.target.value)}
                      className="bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-4 py-2 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">Tipo de Caixa</label>
                    <select
                      value={newCardType}
                      onChange={e => setNewCardType(e.target.value)}
                      className="bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-4 py-2 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      <option value="PIX">PIX</option>
                      <option value="Dinheiro">Dinheiro</option>
                      <option value="Cartão">Cartão</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white rounded-xl py-2.5 font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-900/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Novo Caixa</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  };

  const renderEntradas = () => {
    // 1. Cálculos dos Indicadores (com base no supabaseEntradas geral)
    const todayObj = new Date();

    // Entradas do Dia (Formato YYYY-MM-DD)
    const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;
    const entradasDoDia = supabaseEntradas
      .filter(item => {
        const dateStr = item.data_entrada ? item.data_entrada.split('T')[0] : '';
        return dateStr === todayStr;
      })
      .reduce((acc, curr) => acc + (curr.valor || 0), 0);

    // Entradas da Semana (Domingo a Sábado calendar week)
    const getWeekStringRange = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = Sunday

      const start = new Date(now);
      start.setDate(now.getDate() - dayOfWeek);

      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      const startStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
      const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;

      return { startStr, endStr };
    };
    const { startStr, endStr } = getWeekStringRange();
    const entradasDaSemana = supabaseEntradas
      .filter(item => {
        const dateStr = item.data_entrada ? item.data_entrada.split('T')[0] : '';
        return dateStr && dateStr >= startStr && dateStr <= endStr;
      })
      .reduce((acc, curr) => acc + (curr.valor || 0), 0);

    // Entradas do Mês (Formato YYYY-MM)
    const currentMonthStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}`;
    const entradasDoMes = supabaseEntradas
      .filter(item => {
        const dateStr = item.data_entrada ? item.data_entrada.split('T')[0] : '';
        return dateStr && dateStr.substring(0, 7) === currentMonthStr;
      })
      .reduce((acc, curr) => acc + (curr.valor || 0), 0);

    // Média por Lançamento
    const mediaPorLancamento = supabaseEntradas.length > 0
      ? (supabaseEntradas.reduce((acc, curr) => acc + (curr.valor || 0), 0) / supabaseEntradas.length)
      : 0;

    // 2. Ordenação e Paginação dos Itens Filtrados
    const sortedSupabaseEntradas = [...filteredSupabaseEntradas].sort((a, b) => {
      const dateA = a.data_entrada ? new Date(a.data_entrada).getTime() : 0;
      const dateB = b.data_entrada ? new Date(b.data_entrada).getTime() : 0;
      return dateB - dateA; // Decrescente (mais recentes primeiro)
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(sortedSupabaseEntradas.length / itemsPerPage);
    const activePage = Math.max(1, Math.min(currentPageEntradas, totalPages || 1));
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedSupabaseEntradas.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="h-full flex flex-col gap-4 w-full">
        {/* Aggregated Finance Stats header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Entradas do Dia */}
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">ENTRADAS DO DIA</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(entradasDoDia)}
              </h4>
            </div>
          </div>
          {/* Entradas da Semana */}
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">ENTRADAS DA SEMANA</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(entradasDaSemana)}
              </h4>
            </div>
          </div>
          {/* Entradas do Mês */}
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0">
              <Wallet className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">ENTRADAS DO MÊS</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(entradasDoMes)}
              </h4>
            </div>
          </div>
          {/* Média por Lançamento */}
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 flex-shrink-0">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">MÉDIA POR LANÇAMENTO</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mediaPorLancamento)}
              </h4>
            </div>
          </div>
        </div>

        {/* Content Box */}
        <div className="flex-1 bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden">
          {entradaFormMode !== 'list' ? (
            <form onSubmit={handleSaveEntrada} className="flex flex-col gap-5 w-full max-w-4xl mr-auto ml-0 py-2 text-left">
              <div className="flex items-center justify-between border-b border-[#1f2433] light-theme:border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">
                    {entradaFormMode === 'create' ? 'Lançar Nova Entrada/Receita' : 'Editar Entrada/Receita'}
                  </h3>
                  <p className="text-[10px] text-[#64748b] mt-1">Preencha os dados do lançamento financeiro.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEntradaFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 border border-[#1f2433] light-theme:border-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Voltar para a Lista</span>
                </button>
              </div>

              {formEntradaError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formEntradaError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[60vh]">
                {/* Data */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Data do Lançamento *</label>
                  <input
                    type="date"
                    required
                    value={formDataEntrada}
                    onChange={e => setFormDataEntrada(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Centro de Custo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Centro de Custo *</label>
                  <select
                    required
                    value={formCentroCustoId}
                    onChange={e => setFormCentroCustoId(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Selecione...</option>
                    {supabaseCentroCusto.map(cc => (
                      <option key={cc.id} value={cc.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                        {cc.nome_centro_custo || cc.descricao}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Forma de Pagamento */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Forma de Pagamento *</label>
                  <select
                    required
                    value={formFormaPagamentoId}
                    onChange={e => setFormFormaPagamentoId(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Selecione...</option>
                    {supabaseFormaPagamento.map(fp => (
                      <option key={fp.id} value={fp.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                        {fp.descricao} ({fp.tipo_transacao})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Valor */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Valor (R$) *</label>
                  <input
                    type="text"
                    required
                    placeholder="0,00"
                    value={formValorEntrada}
                    onChange={e => {
                      const val = e.target.value;
                      const cleanValue = val.replace(/\D/g, '');
                      if (!cleanValue) {
                        setFormValorEntrada('');
                        return;
                      }
                      const cents = parseInt(cleanValue, 10);
                      const formatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cents / 100);
                      setFormValorEntrada(formatted);
                    }}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors font-bold"
                  />
                </div>

                {/* Descrição / Referente a (Linha inteira) */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Descrição / Referente a *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Lavagem Completa"
                    value={formDescricaoEntrada}
                    onChange={e => setFormDescricaoEntrada(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Veículo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Veículo (Opcional)</label>
                  <select
                    value={formVeiculoId}
                    onChange={e => {
                      const val = e.target.value;
                      setFormVeiculoId(val);
                      const selectedVei = supabaseVehicles.find(v => v.id === val);
                      if (selectedVei) {
                        setFormPlacaVeiculo(selectedVei.placa || '');
                        if (selectedVei.pessoa_id) {
                          setFormPessoaId(selectedVei.pessoa_id);
                        }
                      }
                    }}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Nenhum</option>
                    {supabaseVehicles.map(v => (
                      <option key={v.id} value={v.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                        {v.marca_modelo} - {v.placa}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Placa do Veículo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Placa do Veículo (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ex: ABC1D23"
                    value={formPlacaVeiculo}
                    onChange={e => setFormPlacaVeiculo(e.target.value.toUpperCase())}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors font-mono uppercase"
                  />
                </div>

                {/* Cliente Pagante */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Cliente Pagante (Opcional)</label>
                  <select
                    value={formPessoaId}
                    onChange={e => setFormPessoaId(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Nenhum</option>
                    {supabaseData.map(p => (
                      <option key={p.id} value={p.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                        {p.nome_pessoa}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-start gap-3 mt-auto border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setEntradaFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formEntradaSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-violet-900/20 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formEntradaSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Salvar Lançamento</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Tabela de Receitas</h3>
                  {!periodoInicioEntradas && !periodoFimEntradas && (
                    <p className="text-[10px] text-cyan-400 font-semibold mt-1">Exibindo apenas lançamentos do mês atual</p>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Botão para Lançamento de Nova Entrada */}
                  <button
                    type="button"
                    onClick={handleOpenCreateEntrada}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-lg shadow-violet-900/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mr-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Nova Entrada</span>
                  </button>

                  {/* Filtro por Centro de Custos */}
                  <div className="flex items-center gap-2 bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#94a3b8] light-theme:text-slate-600">
                    <span className="font-semibold text-xs uppercase tracking-wider text-[#64748b]">Centro de Custo:</span>
                    <select
                      value={selectedCentroCustoEntradas}
                      onChange={e => {
                        setSelectedCentroCustoEntradas(e.target.value);
                        setCurrentPageEntradas(1);
                      }}
                      className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-xs font-medium max-w-[150px] cursor-pointer"
                    >
                      <option value="" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">Todos</option>
                      {supabaseCentroCusto.map(cc => (
                        <option key={cc.id} value={cc.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                          {cc.nome_centro_custo || cc.descricao}
                        </option>
                      ))}
                    </select>
                    {selectedCentroCustoEntradas && (
                      <button
                        onClick={() => {
                          setSelectedCentroCustoEntradas('');
                          setCurrentPageEntradas(1);
                        }}
                        className="text-xxs font-bold text-rose-400 hover:text-rose-300 ml-1 transition-colors"
                        title="Limpar centro de custo"
                      >
                        Limpar
                      </button>
                    )}
                  </div>

                  {/* Filtro por Período */}
                  <div className="flex items-center gap-2 bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#94a3b8] light-theme:text-slate-600">
                    <span className="font-semibold text-xs uppercase tracking-wider text-[#64748b]">Período:</span>
                    <input
                      type="date"
                      value={periodoInicioEntradas}
                      onChange={e => {
                        setPeriodoInicioEntradas(e.target.value);
                        setCurrentPageEntradas(1);
                      }}
                      className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-xs"
                    />
                    <span className="text-[#64748b] px-0.5">até</span>
                    <input
                      type="date"
                      value={periodoFimEntradas}
                      onChange={e => {
                        setPeriodoFimEntradas(e.target.value);
                        setCurrentPageEntradas(1);
                      }}
                      className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-xs"
                    />
                    {(periodoInicioEntradas || periodoFimEntradas) && (
                      <button
                        onClick={() => {
                          setPeriodoInicioEntradas('');
                          setPeriodoFimEntradas('');
                          setCurrentPageEntradas(1);
                        }}
                        className="text-xxs font-bold text-rose-400 hover:text-rose-300 ml-1 transition-colors"
                        title="Limpar período"
                      >
                        Limpar
                      </button>
                    )}
                  </div>

                  {/* Search bar */}
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Buscar receitas..."
                      value={searchSupabaseEntradas}
                      onChange={e => {
                        setSearchSupabaseEntradas(e.target.value);
                        setCurrentPageEntradas(1);
                      }}
                      className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {sortedSupabaseEntradas.length === 0 ? (
                  <div className="h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
                    <Database className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
                    <span className="text-xs">Nenhuma receita registrada no Supabase</span>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1f2433] light-theme:border-slate-100 text-[10px] text-[#64748b] uppercase tracking-wider font-bold">
                        <th className="pb-3 pr-6">Data</th>
                        <th className="pb-3 pr-6">Centro de Custo</th>
                        <th className="pb-3 pr-6">Referente a</th>
                        <th className="pb-3 pr-6">Forma de Pagamento</th>
                        <th className="pb-3 text-right pr-6">Valor</th>
                        <th className="pb-3 pr-6">Veículo placa</th>
                        <th className="pb-3 pr-6">Pessoa pagante</th>
                        <th className="pb-3 text-center w-24">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                      {currentItems.map(item => (
                        <tr key={item.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 pr-6 font-medium text-[#64748b]">{item.data_entrada ? new Date(item.data_entrada).toLocaleDateString('pt-BR') : 'N/A'}</td>
                          <td className="py-3.5 pr-6 font-medium text-slate-300 light-theme:text-slate-500">{item.nome_centro_custo || 'Operacional Geral'}</td>
                          <td className="py-3.5 pr-6 font-semibold text-white light-theme:text-slate-800">{item.descricao_entrada || 'Serviço Lavatório'}</td>
                          <td className="py-3.5 pr-6 font-medium">{item.descricao_forma_pagamento || 'N/A'}</td>
                          <td className="py-3.5 text-right pr-6 font-bold text-emerald-400">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor || 0)}
                          </td>
                          <td className="py-3.5 pr-6 font-mono font-bold uppercase tracking-wider text-cyan-400">{item.placa_veiculo || ''}</td>
                          <td className="py-3.5 pr-6 font-medium text-slate-300 light-theme:text-slate-500">{item.nome_pessoa || ''}</td>
                          <td className="py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditEntrada(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Editar Lançamento"
                              >
                                <Pencil className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsExcluindoEntrada(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Excluir Lançamento"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-[#1f2433] light-theme:border-slate-200 pt-4 mt-4 flex-wrap gap-4">
                  <span className="text-[11px] text-[#64748b] font-medium">
                    Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedSupabaseEntradas.length)} de {sortedSupabaseEntradas.length} registros
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPageEntradas(prev => Math.max(1, prev - 1))}
                      disabled={activePage === 1}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, idx) => {
                      const pageNum = idx + 1;
                      const isNearCurrent = Math.abs(pageNum - activePage) <= 1;
                      const isFirstOrLast = pageNum === 1 || pageNum === totalPages;

                      if (!isNearCurrent && !isFirstOrLast) {
                        if (pageNum === 2 || pageNum === totalPages - 1) {
                          return <span key={`dots-${pageNum}`} className="text-xxs text-[#64748b] px-1 font-bold">...</span>;
                        }
                        return null;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPageEntradas(pageNum)}
                          className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-bold transition-all ${activePage === pageNum
                              ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-900/20'
                              : 'border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPageEntradas(prev => Math.min(totalPages, prev + 1))}
                      disabled={activePage === totalPages}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal de Confirmação de Exclusão da Entrada */}
        <AnimatePresence>
          {isExcluindoEntrada && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isDeletingEntrada && setIsExcluindoEntrada(null)}
                className="absolute inset-0 bg-[#06080d]/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white light-theme:text-slate-800 text-base">Excluir Lançamento?</h3>
                    <p className="text-xxs text-[#64748b] mt-1 leading-relaxed">
                      Você tem certeza que deseja excluir o lançamento <strong>"{isExcluindoEntrada.descricao_entrada || 'Serviço'}"</strong> no valor de <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(isExcluindoEntrada.valor || 0)}</strong>? Esta ação não pode ser desfeita.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    onClick={() => setIsExcluindoEntrada(null)}
                    disabled={isDeletingEntrada}
                    className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteEntrada}
                    disabled={isDeletingEntrada}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-600/10 transition-colors"
                  >
                    {isDeletingEntrada ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    <span>Confirmar Exclusão</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderDespesas = () => {
    // Current date helpers for indicator cards
    const todayStr = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local format
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Despesas do dia (soma das despesas do dia)
    const despesasDia = supabaseDespesas.reduce((acc, curr) => {
      if (!curr.data_despesa) return acc;
      const dateStr = curr.data_despesa.split('T')[0];
      if (dateStr === todayStr) {
        return acc + (curr.valor || 0);
      }
      return acc;
    }, 0);

    // Get start of this week (Sunday, 00:00:00 local time)
    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // Get end of this week (Saturday, 23:59:59 local time)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Despesas da semana (soma das despesas da semana)
    const despesasSemana = supabaseDespesas.reduce((acc, curr) => {
      if (!curr.data_despesa) return acc;
      const itemDate = new Date(curr.data_despesa.split('T')[0] + 'T12:00:00');
      if (itemDate >= startOfWeek && itemDate <= endOfWeek) {
        return acc + (curr.valor || 0);
      }
      return acc;
    }, 0);

    // Despesas do mês (soma das despesas do mês)
    const despesasMes = supabaseDespesas.reduce((acc, curr) => {
      if (!curr.data_despesa) return acc;
      const itemDate = new Date(curr.data_despesa.split('T')[0] + 'T12:00:00');
      if (itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth) {
        return acc + (curr.valor || 0);
      }
      return acc;
    }, 0);

    // Média por lançamento (média de valor de despesas)
    const mediaLancamento = supabaseDespesas.length > 0
      ? (supabaseDespesas.reduce((acc, curr) => acc + (curr.valor || 0), 0) / supabaseDespesas.length)
      : 0;

    // Pagination calculations
    const indexOfLastItem = currentPageDespesas * 10;
    const indexOfFirstItem = indexOfLastItem - 10;
    const totalPages = Math.ceil(sortedSupabaseDespesas.length / 10);
    const currentItems = sortedSupabaseDespesas.slice(indexOfFirstItem, indexOfLastItem);

    // Helper to format date safely in local time as DD/MM/YYYY without timezone shift issues
    const formatDate = (dateStr?: string) => {
      if (!dateStr) return 'N/A';
      const cleanDate = dateStr.split('T')[0];
      const parts = cleanDate.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return new Date(dateStr).toLocaleDateString('pt-BR');
    };

    return (
      <div className="h-full flex flex-col gap-4 w-full">
        {/* Finance Stats header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 flex-shrink-0">
              <TrendingDown className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none uppercase">DESPESAS DO DIA</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesasDia)}
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 flex-shrink-0">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none uppercase">DESPESAS DA SEMANA</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesasSemana)}
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 flex-shrink-0">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none uppercase">DESPESAS DO MÊS</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesasMes)}
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none uppercase">MÉDIA POR LANÇAMENTO</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mediaLancamento)}
              </h4>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden">
          {despesaFormMode !== 'list' ? (
            <form onSubmit={handleSaveDespesa} className="flex flex-col gap-5 w-full max-w-4xl mr-auto ml-0 py-2 text-left">
              <div className="flex items-center justify-between border-b border-[#1f2433] light-theme:border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">
                    {despesaFormMode === 'create' ? 'Lançar Nova Despesa/Custo' : 'Editar Despesa/Custo'}
                  </h3>
                  <p className="text-[10px] text-[#64748b] mt-1">Preencha os dados do lançamento de despesa.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDespesaFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 border border-[#1f2433] light-theme:border-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Voltar para a Lista</span>
                </button>
              </div>

              {formDespesaError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formDespesaError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[60vh]">
                {/* Data */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Data do Lançamento *</label>
                  <input
                    type="date"
                    required
                    value={formDataDespesa}
                    onChange={e => setFormDataDespesa(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Centro de Custo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Centro de Custo *</label>
                  <select
                    required
                    value={formCentroCustoIdDespesa}
                    onChange={e => setFormCentroCustoIdDespesa(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Selecione...</option>
                    {supabaseCentroCusto.map(cc => (
                      <option key={cc.id} value={cc.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                        {cc.nome_centro_custo || cc.descricao}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Forma de Pagamento */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Forma de Pagamento *</label>
                  <select
                    required
                    value={formFormaPagamentoIdDespesa}
                    onChange={e => setFormFormaPagamentoIdDespesa(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Selecione...</option>
                    {supabaseFormaPagamento.map(fp => (
                      <option key={fp.id} value={fp.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                        {fp.descricao} ({fp.tipo_transacao})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Valor */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Valor (R$) *</label>
                  <input
                    type="text"
                    required
                    placeholder="0,00"
                    value={formValorDespesa}
                    onChange={e => {
                      const val = e.target.value;
                      const cleanValue = val.replace(/\D/g, '');
                      if (!cleanValue) {
                        setFormValorDespesa('');
                        return;
                      }
                      const cents = parseInt(cleanValue, 10);
                      const formatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cents / 100);
                      setFormValorDespesa(formatted);
                    }}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors font-bold"
                  />
                </div>

                {/* Valor Provisão */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Valor Provisão (R$ - Opcional)</label>
                  <input
                    type="text"
                    placeholder="0,00"
                    value={formValorProvisaoDespesa}
                    onChange={e => {
                      const val = e.target.value;
                      const cleanValue = val.replace(/\D/g, '');
                      if (!cleanValue) {
                        setFormValorProvisaoDespesa('');
                        return;
                      }
                      const cents = parseInt(cleanValue, 10);
                      const formatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cents / 100);
                      setFormValorProvisaoDespesa(formatted);
                    }}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Descrição / Referente a */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Descrição / Referente a *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Compra de insumos de limpeza"
                    value={formDescricaoDespesa}
                    onChange={e => setFormDescricaoDespesa(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-start gap-3 mt-auto border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setDespesaFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formDespesaSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-violet-900/20 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formDespesaSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Salvar Lançamento</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Tabela de Despesas</h3>
                  {!periodoInicioDespesas && !periodoFimDespesas && (
                    <p className="text-[10px] text-rose-400 font-semibold mt-1">Exibindo apenas lançamentos do mês atual</p>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Botão para Lançamento de Nova Despesa */}
                  <button
                    type="button"
                    onClick={handleOpenCreateDespesa}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-lg shadow-violet-900/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mr-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Nova Despesa</span>
                  </button>

                  {/* Filtro por Centro de Custos */}
                  <div className="flex items-center gap-2 bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#94a3b8] light-theme:text-slate-600">
                    <span className="font-semibold text-xs uppercase tracking-wider text-[#64748b]">Centro de Custo:</span>
                    <select
                      value={selectedCentroCustoDespesas}
                      onChange={e => {
                        setSelectedCentroCustoDespesas(e.target.value);
                        setCurrentPageDespesas(1);
                      }}
                      className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-xs font-medium max-w-[150px] cursor-pointer"
                    >
                      <option value="" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">Todos</option>
                      {supabaseCentroCusto.map(cc => (
                        <option key={cc.id} value={cc.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                          {cc.nome_centro_custo || cc.descricao}
                        </option>
                      ))}
                    </select>
                    {selectedCentroCustoDespesas && (
                      <button
                        onClick={() => {
                          setSelectedCentroCustoDespesas('');
                          setCurrentPageDespesas(1);
                        }}
                        className="text-xxs font-bold text-rose-400 hover:text-rose-300 ml-1 transition-colors"
                        title="Limpar centro de custo"
                      >
                        Limpar
                      </button>
                    )}
                  </div>

                  {/* Filtro por Período */}
                  <div className="flex items-center gap-2 bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#94a3b8] light-theme:text-slate-600">
                    <span className="font-semibold text-xs uppercase tracking-wider text-[#64748b]">Período:</span>
                    <input
                      type="date"
                      value={periodoInicioDespesas}
                      onChange={e => {
                        setPeriodoInicioDespesas(e.target.value);
                        setCurrentPageDespesas(1);
                      }}
                      className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-xs"
                    />
                    <span className="text-[#64748b] px-0.5">até</span>
                    <input
                      type="date"
                      value={periodoFimDespesas}
                      onChange={e => {
                        setPeriodoFimDespesas(e.target.value);
                        setCurrentPageDespesas(1);
                      }}
                      className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-xs"
                    />
                    {(periodoInicioDespesas || periodoFimDespesas) && (
                      <button
                        onClick={() => {
                          setPeriodoInicioDespesas('');
                          setPeriodoFimDespesas('');
                          setCurrentPageDespesas(1);
                        }}
                        className="text-xxs font-bold text-rose-400 hover:text-rose-300 ml-1 transition-colors"
                        title="Limpar período"
                      >
                        Limpar
                      </button>
                    )}
                  </div>

                  {/* Search bar */}
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Buscar despesas..."
                      value={searchSupabaseDespesas}
                      onChange={e => {
                        setSearchSupabaseDespesas(e.target.value);
                        setCurrentPageDespesas(1);
                      }}
                      className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {sortedSupabaseDespesas.length === 0 ? (
                  <div className="h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
                    <Database className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
                    <span className="text-xs">Nenhuma despesa registrada no Supabase</span>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1f2433] light-theme:border-slate-100 text-[10px] text-[#64748b] uppercase tracking-wider font-bold">
                        <th className="pb-3 pr-6">Data</th>
                        <th className="pb-3 pr-6">Centro de Custo</th>
                        <th className="pb-3 pr-6">Referente a</th>
                        <th className="pb-3 pr-6">Forma de Pagamento</th>
                        <th className="pb-3 text-right pr-6">Valor</th>
                        <th className="pb-3 text-right pr-6">Valor provisão</th>
                        <th className="pb-3 text-center w-24">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                      {currentItems.map(item => (
                        <tr key={item.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 pr-6 font-medium text-[#64748b]">{formatDate(item.data_despesa)}</td>
                          <td className="py-3.5 pr-6 font-semibold text-white light-theme:text-slate-800">{item.nome_centro_custos || 'Operacional Geral'}</td>
                          <td className="py-3.5 pr-6 font-medium text-slate-300 light-theme:text-slate-500">{item.descricao_despesa || 'N/A'}</td>
                          <td className="py-3.5 pr-6 font-medium">{item.descricao_forma_pagamento || 'N/A'}</td>
                          <td className="py-3.5 text-right pr-6 font-bold text-rose-400">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor || 0)}
                          </td>
                          <td className="py-3.5 text-right pr-6 font-medium text-yellow-500">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_provisao || 0)}
                          </td>
                          <td className="py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditDespesa(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Editar Lançamento"
                              >
                                <Pencil className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsExcluindoDespesa(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Excluir Lançamento"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-[#1f2433] light-theme:border-slate-200 pt-4 mt-4 flex-wrap gap-4">
                  <span className="text-[11px] text-[#64748b] font-medium">
                    Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedSupabaseDespesas.length)} de {sortedSupabaseDespesas.length} registros
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPageDespesas(prev => Math.max(1, prev - 1))}
                      disabled={currentPageDespesas === 1}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, idx) => {
                      const pageNum = idx + 1;
                      const isNearCurrent = Math.abs(pageNum - currentPageDespesas) <= 1;
                      const isFirstOrLast = pageNum === 1 || pageNum === totalPages;

                      if (!isNearCurrent && !isFirstOrLast) {
                        if (pageNum === 2 || pageNum === totalPages - 1) {
                          return <span key={`dots-${pageNum}`} className="text-xxs text-[#64748b] px-1 font-bold">...</span>;
                        }
                        return null;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPageDespesas(pageNum)}
                          className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-bold transition-all ${currentPageDespesas === pageNum
                              ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-900/20'
                              : 'border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPageDespesas(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPageDespesas === totalPages}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal de Confirmação de Exclusão da Despesa */}
        <AnimatePresence>
          {isExcluindoDespesa && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isDeletingDespesa && setIsExcluindoDespesa(null)}
                className="absolute inset-0 bg-[#06080d]/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white light-theme:text-slate-800 text-base">Excluir Lançamento?</h3>
                    <p className="text-xxs text-[#64748b] mt-1 leading-relaxed">
                      Você tem certeza que deseja excluir o lançamento de despesa <strong>"{isExcluindoDespesa.descricao_despesa || 'Serviço'}"</strong> no valor de <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(isExcluindoDespesa.valor || 0)}</strong>? Esta ação não pode ser desfeita.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    onClick={() => setIsExcluindoDespesa(null)}
                    disabled={isDeletingDespesa}
                    className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteDespesa}
                    disabled={isDeletingDespesa}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-600/10 transition-colors"
                  >
                    {isDeletingDespesa ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    <span>Confirmar Exclusão</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderMensalistas = () => {
    const totalVipRevenue = supabaseMensalistas.reduce((acc, curr) => acc + (curr.valor_original || 0), 0);

    // Helpers para data
    const formatDate = (dateStr?: string) => {
      if (!dateStr) return 'N/D';
      const cleanDate = dateStr.split('T')[0];
      const parts = cleanDate.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return new Date(dateStr).toLocaleDateString('pt-BR');
    };

    // Sub-view do Financeiro do Mensalista
    if (activeMensalistaFinanceiro) {
      const myParcelas = supabaseMensalistaParcelas
        .filter(p => p.mensalista_id === activeMensalistaFinanceiro.id)
        .sort((a, b) => {
          const dateA = a.data_vencimento ? new Date(a.data_vencimento).getTime() : 0;
          const dateB = b.data_vencimento ? new Date(b.data_vencimento).getTime() : 0;
          return dateA - dateB; // Cronológica crescente (vence primeiro primeiro)
        });

      const totalRecebido = myParcelas
        .filter(p => p.data_pagamento)
        .reduce((acc, curr) => acc + (curr.valor_pago || 0), 0);

      const totalPendente = myParcelas
        .filter(p => !p.data_pagamento)
        .reduce((acc, curr) => acc + (curr.valor_original || 0), 0);

      return (
        <div className="h-full flex flex-col gap-4 w-full">
          {/* Header Stats Financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#64748b] font-bold block leading-none uppercase">TOTAL RECEBIDO</span>
                <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRecebido)}
                </h4>
              </div>
            </div>
            <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 flex-shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#64748b] font-bold block leading-none uppercase">TOTAL PENDENTE</span>
                <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPendente)}
                </h4>
              </div>
            </div>
            <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#64748b] font-bold block leading-none uppercase">PARCELAS LANÇADAS</span>
                <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                  {myParcelas.length} parcelas registradas
                </h4>
              </div>
            </div>
          </div>

          {/* Painel de Parcelas */}
          <div className="flex-1 bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-[#1f2433] light-theme:border-slate-100 pb-3 flex-wrap gap-4">
              <div>
                <h3 className="text-sm font-bold text-white light-theme:text-slate-800 flex items-center gap-2">
                  <CreditCard className="h-4.5 w-4.5 text-violet-400" />
                  <span>Mensalidades: {activeMensalistaFinanceiro.nome_pessoa}</span>
                </h3>
                <p className="text-[10px] text-[#64748b] mt-1">Controle de carnê de cobranças e baixas automáticas de mensalidades.</p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const year = new Date().getFullYear();
                    const month = String(new Date().getMonth() + 1).padStart(2, '0');
                    setGenMesAnoInicio(`${year}-${month}`);
                    const formattedValor = activeMensalistaFinanceiro.valor_original !== undefined
                      ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(activeMensalistaFinanceiro.valor_original)
                      : '';
                    setGenValorParcela(formattedValor);
                    setGenDiaVencimento(activeMensalistaFinanceiro.dia_vencimento || 10);
                    setGenQtyParcelas(12);
                    setGenError(null);
                    setIsGeneratingParcelas(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-violet-900/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mr-2 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Gerar Parcelas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMensalistaFinanceiro(null)}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 border border-[#1f2433] light-theme:border-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Voltar para Mensalistas</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {myParcelas.length === 0 ? (
                <div className="h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
                  <Database className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
                  <span className="text-xs">Nenhuma parcela gerada para este mensalista ainda.</span>
                  <button
                    type="button"
                    onClick={() => {
                      const year = new Date().getFullYear();
                      const month = String(new Date().getMonth() + 1).padStart(2, '0');
                      setGenMesAnoInicio(`${year}-${month}`);
                      const formattedValor = activeMensalistaFinanceiro.valor_original !== undefined
                        ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(activeMensalistaFinanceiro.valor_original)
                        : '';
                      setGenValorParcela(formattedValor);
                      setGenDiaVencimento(activeMensalistaFinanceiro.dia_vencimento || 10);
                      setGenQtyParcelas(12);
                      setGenError(null);
                      setIsGeneratingParcelas(true);
                    }}
                    className="text-xxs font-bold text-violet-400 hover:text-violet-300 mt-1 transition-colors underline cursor-pointer"
                  >
                    Gerar carnê de parcelas inicial agora
                  </button>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#1f2433] light-theme:border-slate-100 text-[10px] text-[#64748b] uppercase tracking-wider font-bold">
                      <th className="pb-3">Vencimento</th>
                      <th className="pb-3 text-right">Valor Original</th>
                      <th className="pb-3">Data Pagamento</th>
                      <th className="pb-3 text-right">Valor Pago</th>
                      <th className="pb-3 text-center">Status</th>
                      <th className="pb-3 text-center w-24">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                    {myParcelas.map(p => (
                      <tr key={p.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 font-bold text-slate-300 light-theme:text-slate-700">{formatDate(p.data_vencimento)}</td>
                        <td className="py-3.5 text-right font-semibold pr-4">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.valor_original || 0)}
                        </td>
                        <td className="py-3.5 font-medium text-[#64748b]">{p.data_pagamento ? formatDate(p.data_pagamento) : '-'}</td>
                        <td className="py-3.5 text-right font-bold text-emerald-400 pr-4">
                          {p.data_pagamento ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.valor_pago || 0) : '-'}
                        </td>
                        <td className="py-3.5 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${p.data_pagamento
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                              : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                            }`}>
                            {p.data_pagamento ? 'Paga' : 'Pendente'}
                          </span>
                        </td>
                        <td className="py-3.5 text-center">
                          {!p.data_pagamento ? (
                            <button
                              type="button"
                              onClick={() => {
                                setPayDataPagamento(new Date().toLocaleDateString('en-CA'));
                                const formattedValor = p.valor_original !== undefined
                                  ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(p.valor_original)
                                  : '';
                                setPayValorPago(formattedValor);
                                setPayFormaPagamentoId('');
                                setPayCentroCustoId(activeMensalistaFinanceiro.centro_custo_id || '');
                                setPayError(null);
                                setIsPayingParcela(p);
                              }}
                              className="px-2.5 py-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-emerald-600/15 light-theme:hover:bg-emerald-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-emerald-500/30 light-theme:hover:border-emerald-500/20 text-emerald-400 font-bold text-[10px] transition-colors cursor-pointer"
                            >
                              Dar Baixa
                            </button>
                          ) : (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[10px] text-emerald-400 font-semibold italic flex items-center justify-center gap-1">
                                <CheckCircle className="h-3 w-3 text-emerald-500" />
                                Baixado
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setRevertError(null);
                                  setIsRevertingParcela(p);
                                }}
                                className="text-[9px] text-rose-400 hover:text-rose-300 font-bold hover:underline transition-colors cursor-pointer"
                              >
                                Estornar Baixa
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Modal de Geração de Parcelas em Lote */}
          <AnimatePresence>
            {isGeneratingParcelas && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => !genSubmitting && setIsGeneratingParcelas(false)}
                  className="absolute inset-0 bg-[#06080d]/80 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-md bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-cyan-500" />

                  <div className="text-left">
                    <h3 className="font-bold text-white light-theme:text-slate-800 text-base">Gerar Carnê de Parcelas</h3>
                    <p className="text-xxs text-[#64748b] mt-1 leading-relaxed">
                      Insira as configurações abaixo para criar em massa as mensalidades de <strong>{activeMensalistaFinanceiro.nome_pessoa}</strong> no Supabase.
                    </p>
                  </div>

                  {genError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{genError}</span>
                    </div>
                  )}

                  <form onSubmit={handleGenerateParcelas} className="flex flex-col gap-3.5 text-left">
                    <div className="grid grid-cols-2 gap-3.5">
                      {/* Qtd Parcelas */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Quantidade *</label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="100"
                          value={genQtyParcelas}
                          onChange={e => setGenQtyParcelas(parseInt(e.target.value))}
                          className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>

                      {/* Valor Parcela */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Valor Unitário *</label>
                        <input
                          type="text"
                          required
                          placeholder="0,00"
                          value={genValorParcela}
                          onChange={e => {
                            const val = e.target.value;
                            const cleanValue = val.replace(/\D/g, '');
                            if (!cleanValue) {
                              setGenValorParcela('');
                              return;
                            }
                            const cents = parseInt(cleanValue, 10);
                            const formatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cents / 100);
                            setGenValorParcela(formatted);
                          }}
                          className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 font-bold focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      {/* Dia de Vencimento */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Dia Vencimento *</label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="31"
                          value={genDiaVencimento}
                          onChange={e => setGenDiaVencimento(parseInt(e.target.value))}
                          className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>

                      {/* Mês Inicial */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Mês Inicial *</label>
                        <input
                          type="month"
                          required
                          value={genMesAnoInicio}
                          onChange={e => setGenMesAnoInicio(e.target.value)}
                          className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-3 pt-3 border-t border-[#1f2433]/40">
                      <button
                        type="button"
                        onClick={() => setIsGeneratingParcelas(false)}
                        disabled={genSubmitting}
                        className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={genSubmitting}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-violet-900/15 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {genSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        <span>Gerar Parcelas</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Modal de Baixa de Parcela Integrada */}
          <AnimatePresence>
            {isPayingParcela && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => !paySubmitting && setIsPayingParcela(null)}
                  className="absolute inset-0 bg-[#06080d]/80 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-md bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />

                  <div className="text-left">
                    <h3 className="font-bold text-white light-theme:text-slate-800 text-base">Dar Baixa de Parcela</h3>
                    <p className="text-xxs text-[#64748b] mt-1 leading-relaxed">
                      Registre o pagamento da mensalidade de <strong>{activeMensalistaFinanceiro.nome_pessoa}</strong>. Isso criará uma entrada de receita automaticamente.
                    </p>
                  </div>

                  {payError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{payError}</span>
                    </div>
                  )}

                  <form onSubmit={handlePayParcela} className="flex flex-col gap-3.5 text-left">
                    {/* Data Pagamento */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Data do Pagamento *</label>
                      <input
                        type="date"
                        required
                        value={payDataPagamento}
                        onChange={e => setPayDataPagamento(e.target.value)}
                        className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>

                    {/* Valor Pago */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Valor Efetivamente Pago (R$) *</label>
                      <input
                        type="text"
                        required
                        placeholder="0,00"
                        value={payValorPago}
                        onChange={e => {
                          const val = e.target.value;
                          const cleanValue = val.replace(/\D/g, '');
                          if (!cleanValue) {
                            setPayValorPago('');
                            return;
                          }
                          const cents = parseInt(cleanValue, 10);
                          const formatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cents / 100);
                          setPayValorPago(formatted);
                        }}
                        className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 font-bold focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>

                    {/* Centro de Custo */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Centro de Custo Financeiro *</label>
                      <select
                        required
                        value={payCentroCustoId}
                        onChange={e => setPayCentroCustoId(e.target.value)}
                        className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                      >
                        <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Selecione...</option>
                        {supabaseCentroCusto
                          .filter(cc => {
                            const movLower = String(cc.tipo_movimentacao || '').toLowerCase();
                            return movLower.includes('credito') || movLower.includes('crédito') || movLower.includes('entrada') || movLower.includes('receita');
                          })
                          .map(cc => (
                            <option key={cc.id} value={cc.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                              {cc.nome_centro_custo || cc.descricao}
                            </option>
                          ))
                        }
                      </select>
                    </div>

                    {/* Forma de Pagamento */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Forma de Pagamento *</label>
                      <select
                        required
                        value={payFormaPagamentoId}
                        onChange={e => setPayFormaPagamentoId(e.target.value)}
                        className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                      >
                        <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Selecione...</option>
                        {supabaseFormaPagamento.map(fp => (
                          <option key={fp.id} value={fp.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                            {fp.descricao} ({fp.tipo_transacao})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-3 pt-3 border-t border-[#1f2433]/40">
                      <button
                        type="button"
                        onClick={() => setIsPayingParcela(null)}
                        disabled={paySubmitting}
                        className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={paySubmitting}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/10 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {paySubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        <span>Confirmar Pagamento</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            {isRevertingParcela && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => !revertSubmitting && setIsRevertingParcela(null)}
                  className="absolute inset-0 bg-[#06080d]/80 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-md bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />

                  <div className="flex items-start gap-3.5">
                    <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                      <ShieldAlert className="h-5 w-5 animate-pulse" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-white light-theme:text-slate-800 text-base">Confirmar Estorno Financeiro?</h3>
                      <p className="text-xxs text-[#64748b] mt-1 leading-relaxed">
                        Você está prestes a realizar o estorno da parcela com vencimento em <strong>{formatDate(isRevertingParcela.data_vencimento)}</strong> no valor de <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(isRevertingParcela.valor_pago || isRevertingParcela.valor_original || 0)}</strong>.
                      </p>
                    </div>
                  </div>

                  {revertError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2 text-left">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{revertError}</span>
                    </div>
                  )}

                  {/* Informação de Atenção do Estorno */}
                  <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[#d97706] text-xxs flex flex-col gap-1.5 text-left">
                    <span className="font-bold flex items-center gap-1">
                      ⚠️ ATENÇÃO E EFEITOS DO ESTORNO:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 font-medium text-slate-400 light-theme:text-slate-600">
                      <li>A parcela correspondente será alterada de <strong className="text-emerald-400">Paga</strong> para <strong className="text-yellow-500">Pendente</strong> no sistema.</li>
                      <li>O lançamento de receita de valor <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(isRevertingParcela.valor_pago || 0)}</strong> será **excluído permanentemente** da aba de Entradas.</li>
                      <li>Esta ação não pode ser desfeita de forma automática após confirmada.</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-1.5 border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-3">
                    <button
                      onClick={() => setIsRevertingParcela(null)}
                      disabled={revertSubmitting}
                      className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleRevertParcela}
                      disabled={revertSubmitting}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-600/15 transition-colors"
                    >
                      {revertSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
                      <span>Confirmar Estorno</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col gap-4 w-full">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">MENSALISTAS ATIVOS</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {supabaseMensalistas.filter(m => m.ativo).length} de {supabaseMensalistas.length} Cadastros
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <DollarSign className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">FATURAMENTO PREVISTO MENSAL</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalVipRevenue)}
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">TICKET MÉDIO MENSALISTA</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(supabaseMensalistas.length > 0 ? (totalVipRevenue / supabaseMensalistas.length) : 0)}
              </h4>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden">
          {mensalistaFormMode !== 'list' ? (
            <form onSubmit={handleSaveMensalista} className="flex flex-col justify-between w-full max-w-4xl mr-auto ml-0 py-2 text-left h-full overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#1f2433] light-theme:border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">
                    {mensalistaFormMode === 'create' ? 'Cadastrar Novo Mensalista' : 'Editar Mensalista'}
                  </h3>
                  <p className="text-[10px] text-[#64748b] mt-1">Preencha os dados do mensalista e vincule sua conta de cliente.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMensalistaFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 border border-[#1f2433] light-theme:border-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Voltar para a Lista</span>
                </button>
              </div>

              {formMensalistaError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formMensalistaError}</span>
                </div>
              )}

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar py-1">
                {/* Status Ativo Toggle (Alterado para Toggle e colocado no início, antes de Cliente/Pessoa) */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-200 light-theme:text-slate-700">Mensalista Ativo</span>
                      <span className="text-[10px] text-[#64748b]">Habilitar cobrança e acesso do cliente</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormAtivoMensalista(prev => !prev)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        formAtivoMensalista ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-[#161924] light-theme:bg-slate-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formAtivoMensalista ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Integração com Pessoa */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Vincular Cliente (Pessoa) *</label>
                  <select
                    required
                    value={supabaseData.find(p => p.nome_pessoa === formNomePessoaMensalista)?.id || ''}
                    onChange={e => {
                      const selectedId = e.target.value;
                      const p = supabaseData.find(person => person.id === selectedId);
                      if (p) {
                        setFormNomePessoaMensalista(p.nome_pessoa || '');
                      } else {
                        setFormNomePessoaMensalista('');
                      }
                      // Reset vehicle selection when client changes
                      setFormVeiculoIdMensalista('');
                      setFormPlacaMensalista('');
                      setFormMarcaModeloMensalista('');
                    }}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Selecione uma pessoa...</option>
                    {supabaseData.map(p => (
                      <option key={p.id} value={p.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                        {p.nome_pessoa} {p.cpf ? `(CPF: ${p.cpf})` : p.cnpj ? `(CNPJ: ${p.cnpj})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Integração com Veículo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Vincular Veículo (Opcional)</label>
                  <select
                    value={formVeiculoIdMensalista}
                    onChange={e => {
                      const selectedId = e.target.value;
                      setFormVeiculoIdMensalista(selectedId);
                      const v = supabaseVehicles.find(veh => veh.id === selectedId);
                      if (v) {
                        setFormPlacaMensalista(v.placa || '');
                        setFormMarcaModeloMensalista(v.marca_modelo || '');
                      } else {
                        setFormPlacaMensalista('');
                        setFormMarcaModeloMensalista('');
                      }
                    }}
                    disabled={!formNomePessoaMensalista}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!formNomePessoaMensalista ? (
                      <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Selecione o cliente primeiro...</option>
                    ) : (
                      <>
                        <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Nenhum...</option>
                        {supabaseVehicles
                          .filter(v => {
                            const pId = supabaseData.find(p => p.nome_pessoa === formNomePessoaMensalista)?.id;
                            return (pId && v.pessoa_id === pId) || (v.pessoa_nome === formNomePessoaMensalista);
                          })
                          .map(v => (
                            <option key={v.id} value={v.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                              {v.marca_modelo} - {v.placa}
                            </option>
                          ))
                        }
                      </>
                    )}
                  </select>
                </div>

                {/* Placa do Veículo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Placa do Veículo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: ABC1D23"
                    value={formPlacaMensalista}
                    onChange={e => setFormPlacaMensalista(e.target.value.toUpperCase())}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors font-mono uppercase"
                  />
                </div>

                {/* Marca / Modelo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Marca / Modelo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Toyota Corolla 2024"
                    value={formMarcaModeloMensalista}
                    onChange={e => setFormMarcaModeloMensalista(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Centro de Custo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Centro de Custo Financeiro *</label>
                  <select
                    required
                    value={formCentroCustoIdMensalista}
                    onChange={e => setFormCentroCustoIdMensalista(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#0e111a] light-theme:bg-white text-[#64748b]">Selecione...</option>
                    {supabaseCentroCusto
                      .filter(cc => {
                        const movLower = String(cc.tipo_movimentacao || '').toLowerCase();
                        return movLower.includes('credito') || movLower.includes('crédito') || movLower.includes('entrada') || movLower.includes('receita');
                      })
                      .map(cc => (
                        <option key={cc.id} value={cc.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                          {cc.nome_centro_custo || cc.descricao}
                        </option>
                      ))
                    }
                  </select>
                </div>

                {/* Valor Mensalidade */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Valor Mensalidade (R$) *</label>
                  <input
                    type="text"
                    required
                    placeholder="0,00"
                    value={formValorOriginalMensalista}
                    onChange={e => {
                      const val = e.target.value;
                      const cleanValue = val.replace(/\D/g, '');
                      if (!cleanValue) {
                        setFormValorOriginalMensalista('');
                        return;
                      }
                      const cents = parseInt(cleanValue, 10);
                      const formatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cents / 100);
                      setFormValorOriginalMensalista(formatted);
                    }}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 font-bold focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Dia Vencimento */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Dia de Vencimento *</label>
                  <input
                    type="text"
                    maxLength={2}
                    required
                    placeholder="Ex: 10"
                    value={formDiaVencimentoMensalista}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                      setFormDiaVencimentoMensalista(val);
                    }}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Observações */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Observações adicionais</label>
                  <textarea
                    placeholder="Insira notas do contrato, descontos especiais ou preferências do mensalista..."
                    value={formObservacaoMensalista}
                    onChange={e => setFormObservacaoMensalista(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors h-20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-start gap-3 border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-4 flex-shrink-0 mt-2">
                <button
                  type="button"
                  onClick={() => setMensalistaFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formMensalistaSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-violet-900/20 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formMensalistaSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Salvar Mensalista</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Gestão de Mensalistas</h3>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Botão de Novo Mensalista */}
                  <button
                    type="button"
                    onClick={handleOpenCreateMensalista}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-lg shadow-violet-900/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mr-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Novo Mensalista</span>
                  </button>

                  {/* Filtro por Período */}
                  <div className="flex items-center gap-2 bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#94a3b8] light-theme:text-slate-600">
                    <span className="font-semibold text-xs uppercase tracking-wider text-[#64748b]">Cadastro:</span>
                    <input
                      type="date"
                      value={periodoInicioMensalistas}
                      onChange={e => setPeriodoInicioMensalistas(e.target.value)}
                      className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-xs"
                    />
                    <span className="text-[#64748b] px-0.5">até</span>
                    <input
                      type="date"
                      value={periodoFimMensalistas}
                      onChange={e => setPeriodoFimMensalistas(e.target.value)}
                      className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-xs"
                    />
                    {(periodoInicioMensalistas || periodoFimMensalistas) && (
                      <button
                        onClick={() => {
                          setPeriodoInicioMensalistas('');
                          setPeriodoFimMensalistas('');
                        }}
                        className="text-xxs font-bold text-rose-400 hover:text-rose-300 ml-1 transition-colors"
                        title="Limpar período"
                      >
                        Limpar
                      </button>
                    )}
                  </div>

                  {/* Search bar */}
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Buscar mensalistas..."
                      value={searchSupabaseMensalistas}
                      onChange={e => setSearchSupabaseMensalistas(e.target.value)}
                      className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {supabaseMensalistas.length === 0 ? (
                  <div className="h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
                    <Database className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
                    <span className="text-xs">Nenhum mensalista cadastrado no Supabase</span>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1f2433] light-theme:border-slate-100 text-[10px] text-[#64748b] uppercase tracking-wider font-bold">
                        <th className="pb-3 pr-6">Nome / Proprietário</th>
                        <th className="pb-3 pr-6">Plano</th>
                        <th className="pb-3 pr-6">Veículo / Placa</th>
                        <th className="pb-3 text-center pr-6">Dia Vencimento</th>
                        <th className="pb-3 text-right pr-6">Valor Mensalidade</th>
                        <th className="pb-3 text-center pr-6">Data Cadastro</th>
                        <th className="pb-3 text-center pr-6">Status</th>
                        <th className="pb-3 text-center w-28">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                      {filteredSupabaseMensalistas.map(item => (
                        <tr key={item.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 pr-6 font-semibold text-white light-theme:text-slate-800 flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-violet-600/10 text-violet-400 flex items-center justify-center font-bold text-xxs flex-shrink-0">
                              {item.nome_pessoa ? item.nome_pessoa.slice(0, 2).toUpperCase() : 'ME'}
                            </div>
                            <span>{item.nome_pessoa}</span>
                          </td>
                          <td className="py-3.5 pr-6 font-medium text-slate-300 light-theme:text-slate-500">{item.plano || 'Mensal VIP'}</td>
                          <td className="py-3.5 pr-6 font-medium">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-white/5 light-theme:bg-slate-100 border border-white/10 light-theme:border-slate-200 text-cyan-400 light-theme:text-blue-500 uppercase tracking-wide text-[10px]">
                                {item.placa || 'N/A'}
                              </span>
                              <span className="text-[10px] text-[#64748b] truncate max-w-[120px]">{item.marca_modelo}</span>
                            </div>
                          </td>
                          <td className="py-3.5 text-center font-bold pr-6">Dia {item.dia_vencimento || 'N/A'}</td>
                          <td className="py-3.5 text-right font-bold text-white light-theme:text-slate-800 pr-6">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_original || 0)}
                          </td>
                          <td className="py-3.5 text-center font-medium text-[#64748b] pr-6">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                          </td>
                          <td className="py-3.5 text-center pr-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.ativo
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                              }`}>
                              {item.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setActiveMensalistaFinanceiro(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-violet-600/15 light-theme:hover:bg-violet-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-violet-500/30 light-theme:hover:border-violet-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-violet-400 light-theme:hover:text-violet-600 transition-colors cursor-pointer"
                                title="Gerenciar Financeiro (Parcelas)"
                              >
                                <CreditCard className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenEditMensalista(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Editar Cadastro"
                              >
                                <Pencil className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsExcluindoMensalista(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Excluir Mensalista"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal de Confirmação de Exclusão de Mensalista */}
        <AnimatePresence>
          {isExcluindoMensalista && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isDeletingMensalista && setIsExcluindoMensalista(null)}
                className="absolute inset-0 bg-[#06080d]/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white light-theme:text-slate-800 text-base">Excluir Mensalista?</h3>
                    <p className="text-xxs text-[#64748b] mt-1 leading-relaxed">
                      Você tem certeza que deseja excluir o cadastro do mensalista <strong>"{isExcluindoMensalista.nome_pessoa}"</strong>? Suas parcelas financeiras cadastradas serão excluídas permanentemente do Supabase em cascata.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    onClick={() => setIsExcluindoMensalista(null)}
                    disabled={isDeletingMensalista}
                    className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteMensalista}
                    disabled={isDeletingMensalista}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-600/10 transition-colors"
                  >
                    {isDeletingMensalista ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    <span>Confirmar Exclusão</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderPessoas = () => {
    // 1. Ordenação alfabética (nome_pessoa) e Paginação
    const sortedSupabasePessoas = [...filteredSupabase].sort((a, b) => {
      return (a.nome_pessoa || '').localeCompare(b.nome_pessoa || '', 'pt-BR');
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(sortedSupabasePessoas.length / itemsPerPage);
    const activePage = Math.max(1, Math.min(currentPagePessoas, totalPages || 1));
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedSupabasePessoas.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="h-full flex flex-col gap-4 w-full min-h-0">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full flex-shrink-0">
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">PESSOAS FÍSICAS</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {supabaseData.filter(p => p.tipo_pessoa === 'Física').length} Cadastros
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">PESSOAS JURÍDICAS</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {supabaseData.filter(p => p.tipo_pessoa === 'Jurídica').length} Cadastros
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <CheckCircle className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">ATIVAS NO SUPABASE</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {supabaseData.filter(p => p.ativo !== false).length} de {supabaseData.length} Contatos
              </h4>
            </div>
          </div>
        </div>

        <div className={`${pessoaFormMode === 'list' ? 'flex-1 min-h-0 w-full' : 'w-full max-w-3xl h-fit max-h-full flex flex-col min-h-0'} bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden`}>
          {pessoaFormMode !== 'list' ? (
            <form onSubmit={handleSavePessoa} className="flex flex-col min-h-0 w-full py-2 text-left gap-5">
              <div className="flex items-center justify-between border-b border-[#1f2433] light-theme:border-slate-100 pb-3 flex-shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">
                    {pessoaFormMode === 'create' ? 'Cadastrar Nova Pessoa/Cliente' : 'Editar Cadastro de Pessoa'}
                  </h3>
                  <p className="text-[10px] text-[#64748b] mt-1">Preencha os dados do cadastro no Supabase.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPessoaFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 border border-[#1f2433] light-theme:border-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Voltar para a Lista</span>
                </button>
              </div>

              {formPessoaError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formPessoaError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0 py-1">
                {/* Status Toggle Box (Premium Layout from Image) */}
                <div className="flex items-center justify-between md:col-span-2 bg-[#090b11]/45 light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 px-6 py-5 rounded-2xl shadow-sm">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white light-theme:text-[#334155] tracking-wide">
                      {formPessoaTipo === 'Mensalista' ? (formPessoaAtivo ? 'Mensalista Ativo' : 'Mensalista Inativo') :
                       formPessoaTipo === 'Cliente' ? (formPessoaAtivo ? 'Cliente Ativo' : 'Cliente Inativo') :
                       formPessoaTipo === 'Empresa' ? (formPessoaAtivo ? 'Empresa Ativa' : 'Empresa Inativa') :
                       (formPessoaAtivo ? 'Cadastro Ativo' : 'Cadastro Inativo')}
                    </span>
                    <span className="text-[10px] text-[#64748b] font-medium mt-1 leading-relaxed">
                      {formPessoaTipo === 'Mensalista' ? 'Habilitar cobrança e acesso do cliente' :
                       formPessoaTipo === 'Cliente' ? 'Habilitar cadastro e movimentação no sistema' :
                       formPessoaTipo === 'Empresa' ? 'Habilitar faturamento e convênios corporativos' :
                       'Habilitar registros e movimentação no sistema'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormPessoaAtivo(!formPessoaAtivo)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formPessoaAtivo ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.55)]' : 'bg-slate-700 light-theme:bg-slate-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        formPessoaAtivo ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Nome Completo */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João da Silva ou Lava Jato LTDA"
                    value={formPessoaNome}
                    onChange={e => setFormPessoaNome(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Tipo de Pessoa */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Tipo *</label>
                  <select
                    required
                    value={formPessoaTipo}
                    onChange={e => setFormPessoaTipo(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="Cliente" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">Cliente</option>
                    <option value="Mensalista" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">Mensalista</option>
                    <option value="Empresa" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">Empresa</option>
                    <option value="Outros" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">Outros</option>
                  </select>
                </div>

                {/* Documento (CPF / CNPJ) */}
                {formPessoaTipo !== 'Empresa' ? (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">CPF (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ex: 000.000.000-00"
                      value={formPessoaCpf}
                      onChange={e => setFormPessoaCpf(e.target.value)}
                      className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">CNPJ (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ex: 00.000.000/0000-00"
                      value={formPessoaCnpj}
                      onChange={e => setFormPessoaCnpj(e.target.value)}
                      className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                )}

                {/* WhatsApp / Celular */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">WhatsApp / Celular (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ex: (11) 99999-9999"
                    value={formPessoaCelular}
                    onChange={e => setFormPessoaCelular(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Cidade & UF */}
                <div className="grid grid-cols-3 gap-3 md:col-span-2">
                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Cidade (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ex: Uberlândia"
                      value={formPessoaCidade}
                      onChange={e => setFormPessoaCidade(e.target.value)}
                      className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">UF (Opcional)</label>
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="Ex: MG"
                      value={formPessoaUf}
                      onChange={e => setFormPessoaUf(e.target.value.toUpperCase())}
                      className="w-full max-w-[80px] bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors font-mono uppercase text-center"
                    />
                  </div>
                </div>

              </div>

              <div className="flex items-center justify-start gap-3 mt-4 border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setPessoaFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formPessoaSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-violet-900/20 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formPessoaSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Salvar Cadastro</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Diretório de Clientes e Pessoas (Supabase)</h3>
                  {sortedSupabasePessoas.length > 0 && (
                    <p className="text-[10px] text-cyan-400 font-semibold mt-1">Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedSupabasePessoas.length)} de {sortedSupabasePessoas.length} registros</p>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Botão para Lançamento de Nova Pessoa */}
                  <button
                    type="button"
                    onClick={handleOpenCreatePessoa}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-lg shadow-violet-900/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mr-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Nova Pessoa</span>
                  </button>

                  <div className="relative w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Buscar por nome, CPF, CNPJ ou WhatsApp..."
                      value={searchSupabase}
                      onChange={e => {
                        setSearchSupabase(e.target.value);
                        setCurrentPagePessoas(1);
                      }}
                      className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {sortedSupabasePessoas.length === 0 ? (
                  <div className="h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
                    <Database className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
                    <span className="text-xs">Nenhuma pessoa registrada no Supabase</span>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1f2433] light-theme:border-slate-100 text-[10px] text-[#64748b] uppercase tracking-wider font-bold">
                        <th className="pb-3">Nome Completo</th>
                        <th className="pb-3">Tipo</th>
                        <th className="pb-3">Documento (CPF / CNPJ)</th>
                        <th className="pb-3">WhatsApp / Celular</th>
                        <th className="pb-3">Cidade/UF</th>
                        <th className="pb-3 text-center">Status</th>
                        <th className="pb-3 text-center w-24">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                      {currentItems.map(item => (
                        <tr key={item.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 font-semibold text-white light-theme:text-slate-800 flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xxs flex-shrink-0">
                              {item.nome_pessoa ? item.nome_pessoa.slice(0, 2).toUpperCase() : 'PE'}
                            </div>
                            <span>{item.nome_pessoa}</span>
                          </td>
                          <td className="py-3.5 font-medium text-slate-300 light-theme:text-slate-500">{item.tipo_pessoa || 'Física'}</td>
                          <td className="py-3.5 font-mono text-xs">
                            {item.cpf && item.cpf !== 'N/A' ? `CPF: ${item.cpf}` : item.cnpj && item.cnpj !== 'N/A' ? `CNPJ: ${item.cnpj}` : 'Não Informado'}
                          </td>
                          <td className="py-3.5 text-cyan-400 font-bold hover:underline">
                            {item.celular_whatsapp ? (
                              <a href={`https://wa.me/${item.celular_whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                                {item.celular_whatsapp}
                              </a>
                            ) : (
                              'Sem Contato'
                            )}
                          </td>
                          <td className="py-3.5 font-medium">
                            {item.cidade ? `${item.cidade}${item.uf ? `/${item.uf}` : ''}` : 'Não Informado'}
                          </td>
                          <td className="py-3.5 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.ativo !== false
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                              }`}>
                              {item.ativo !== false ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditPessoa(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Editar Cadastro"
                              >
                                <Pencil className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsExcluindoPessoa(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Excluir Cadastro"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-[#1f2433] light-theme:border-slate-200 pt-4 mt-4 flex-wrap gap-4">
                  <span className="text-[11px] text-[#64748b] font-medium">
                    Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedSupabasePessoas.length)} de {sortedSupabasePessoas.length} registros
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPagePessoas(prev => Math.max(1, prev - 1))}
                      disabled={activePage === 1}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, idx) => {
                      const pageNum = idx + 1;
                      const isNearCurrent = Math.abs(pageNum - activePage) <= 1;
                      const isFirstOrLast = pageNum === 1 || pageNum === totalPages;

                      if (!isNearCurrent && !isFirstOrLast) {
                        if (pageNum === 2 || pageNum === totalPages - 1) {
                          return <span key={`dots-${pageNum}`} className="text-xxs text-[#64748b] px-1 font-bold">...</span>;
                        }
                        return null;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPagePessoas(pageNum)}
                          className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-bold transition-all ${activePage === pageNum
                              ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-900/20'
                              : 'border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPagePessoas(prev => Math.min(totalPages, prev + 1))}
                      disabled={activePage === totalPages}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal de Confirmação de Exclusão de Pessoa */}
        <AnimatePresence>
          {isExcluindoPessoa && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isDeletingPessoa && setIsExcluindoPessoa(null)}
                className="absolute inset-0 bg-[#06080d]/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white light-theme:text-slate-800 text-base">Excluir Cadastro?</h3>
                    <p className="text-xxs text-[#64748b] mt-1 leading-relaxed">
                      Você tem certeza que deseja excluir o cadastro de <strong>"{isExcluindoPessoa.nome_pessoa || 'Sem Nome'}"</strong>? Esta ação não pode ser desfeita e pode afetar lançamentos vinculados.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    onClick={() => setIsExcluindoPessoa(null)}
                    disabled={isDeletingPessoa}
                    className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeletePessoa}
                    disabled={isDeletingPessoa}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-600/10 transition-colors"
                  >
                    {isDeletingPessoa ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    <span>Confirmar Exclusão</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderVeiculos = () => {
    // 1. Ordenação alfabética (placa) e Paginação
    const sortedSupabaseVehicles = [...filteredSupabaseVehicles].sort((a, b) => {
      return (a.placa || '').localeCompare(b.placa || '', 'pt-BR');
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(sortedSupabaseVehicles.length / itemsPerPage);
    const activePage = Math.max(1, Math.min(currentPageVeiculos, totalPages || 1));
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedSupabaseVehicles.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="h-full flex flex-col gap-4 w-full min-h-0">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full flex-shrink-0">
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Car className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">FROTA TOTAL</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">{supabaseVehicles.length} Veículos</h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0">
              <User className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">MOTORISTAS VINCULADOS</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {supabaseVehicles.filter(v => v.motorista && v.motorista.length > 0).length} Veículos
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <CheckCircle className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">VEÍCULOS ATIVOS</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {supabaseVehicles.filter(v => v.ativo).length} de {supabaseVehicles.length} Ativos
              </h4>
            </div>
          </div>
        </div>

        <div className={`${veiculoFormMode === 'list' ? 'flex-1 min-h-0 w-full' : 'w-full max-w-3xl h-fit max-h-full flex flex-col min-h-0'} bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden`}>
          {veiculoFormMode !== 'list' ? (
            <form onSubmit={handleSaveVeiculo} className="flex flex-col min-h-0 w-full py-2 text-left gap-5">
              <div className="flex items-center justify-between border-b border-[#1f2433] light-theme:border-slate-100 pb-3 flex-shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">
                    {veiculoFormMode === 'create' ? 'Cadastrar Novo Veículo' : 'Editar Cadastro de Veículo'}
                  </h3>
                  <p className="text-[10px] text-[#64748b] mt-1">Preencha os dados do veículo no Supabase.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setVeiculoFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 border border-[#1f2433] light-theme:border-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Voltar para a Lista</span>
                </button>
              </div>

              {formVeiculoError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formVeiculoError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0 py-1">
                {/* Status Toggle Box (Premium Layout) */}
                <div className="flex items-center justify-between md:col-span-2 bg-[#090b11]/45 light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 px-6 py-5 rounded-2xl shadow-sm">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white light-theme:text-[#334155] tracking-wide">
                      {formVeiculoAtivo ? 'Veículo Ativo' : 'Veículo Inativo'}
                    </span>
                    <span className="text-[10px] text-[#64748b] font-medium mt-1 leading-relaxed">
                      Habilitar veículo para ordens de serviço e mensalidades
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormVeiculoAtivo(!formVeiculoAtivo)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formVeiculoAtivo ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.55)]' : 'bg-slate-700 light-theme:bg-slate-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        formVeiculoAtivo ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Placa */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Placa *</label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    placeholder="Ex: ABC-1234 ou ABC1D23"
                    value={formVeiculoPlaca}
                    onChange={e => setFormVeiculoPlaca(e.target.value.toUpperCase())}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors uppercase font-mono"
                  />
                </div>

                {/* Marca / Modelo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Marca / Modelo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Toyota Corolla"
                    value={formVeiculoMarcaModelo}
                    onChange={e => setFormVeiculoMarcaModelo(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Categoria / Tipo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Categoria / Tipo</label>
                  <select
                    value={formVeiculoTipo}
                    onChange={e => setFormVeiculoTipo(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="CARRETA" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">CARRETA</option>
                    <option value="CAVALO" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">CAVALO</option>
                    <option value="CONJUNTO" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">CONJUNTO</option>
                    <option value="BITREM" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">BITREM</option>
                    <option value="UTILITÁRIO" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">UTILITÁRIO</option>
                    <option value="TANQUE" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">TANQUE</option>
                    <option value="GRANELEIRO" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">GRANELEIRO</option>
                    <option value="BOIADEIRO" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">BOIADEIRO</option>
                    <option value="BAÚ" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">BAÚ</option>
                    <option value="CAÇAMBA" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">CAÇAMBA</option>
                    <option value="CONTAINER" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">CONTAINER</option>
                  </select>
                </div>

                {/* Proprietário */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Proprietário (Opcional)</label>
                  <select
                    value={formVeiculoPessoaId}
                    onChange={e => setFormVeiculoPessoaId(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">Selecione um Proprietário...</option>
                    {[...supabaseData].sort((a, b) => (a.nome_pessoa || '').localeCompare(b.nome_pessoa || '')).map(p => (
                      <option key={p.id} value={p.id} className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">
                        {p.nome_pessoa} {p.cpf ? `(${p.cpf})` : p.cnpj ? `(${p.cnpj})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Motorista Autorizado */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Motoristas Autorizados (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ex: Carlos Silva, Maria Santos (Separe com vírgula para múltiplos)"
                    value={formVeiculoMotorista}
                    onChange={e => setFormVeiculoMotorista(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-start gap-3 mt-4 border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setVeiculoFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formVeiculoSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-violet-900/20 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formVeiculoSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Salvar Veículo</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Listagem de Veículos (Supabase)</h3>
                  {sortedSupabaseVehicles.length > 0 && (
                    <p className="text-[10px] text-cyan-400 font-semibold mt-1">
                      Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedSupabaseVehicles.length)} de {sortedSupabaseVehicles.length} registros
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Botão para Lançamento de Novo Veículo */}
                  <button
                    type="button"
                    onClick={handleOpenCreateVeiculo}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-lg shadow-violet-900/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mr-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Novo Veículo</span>
                  </button>

                  <div className="relative w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Buscar por placa, modelo ou dono..."
                      value={searchSupabaseVehicles}
                      onChange={e => {
                        setSearchSupabaseVehicles(e.target.value);
                        setCurrentPageVeiculos(1);
                      }}
                      className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {sortedSupabaseVehicles.length === 0 ? (
                  <div className="h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
                    <Database className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
                    <span className="text-xs">Nenhum veículo registrado no Supabase</span>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1f2433] light-theme:border-slate-100 text-[10px] text-[#64748b] uppercase tracking-wider font-bold">
                        <th className="pb-3">Placa</th>
                        <th className="pb-3">Marca / Modelo</th>
                        <th className="pb-3">Categoria</th>
                        <th className="pb-3">Proprietário</th>
                        <th className="pb-3">Motorista Autorizado</th>
                        <th className="pb-3 text-center">Status</th>
                        <th className="pb-3 text-center w-24">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                      {currentItems.map(item => (
                        <tr key={item.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 font-semibold">
                            <span className="px-2 py-0.5 rounded font-mono font-bold bg-[#161924] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-300 text-cyan-400 light-theme:text-blue-600 uppercase tracking-wide">
                              {item.placa}
                            </span>
                          </td>
                          <td className="py-3.5 font-bold text-white light-theme:text-slate-800">{item.marca_modelo}</td>
                          <td className="py-3.5 font-medium text-slate-300 light-theme:text-slate-500 capitalize">{item.tipo || 'CARRETA'}</td>
                          <td className="py-3.5 font-medium">{item.pessoa_nome || 'N/A'}</td>
                          <td className="py-3.5 font-medium text-[#64748b]">
                            {item.motorista && item.motorista.length > 0 ? (Array.isArray(item.motorista) ? item.motorista.join(', ') : item.motorista) : 'Proprietário'}
                          </td>
                          <td className="py-3.5 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.ativo
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                              }`}>
                              {item.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditVeiculo(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Editar Cadastro"
                              >
                                <Pencil className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsExcluindoVeiculo(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-100 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-200 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Excluir Cadastro"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-[#1f2433] light-theme:border-slate-200 pt-4 mt-4 flex-wrap gap-4">
                  <span className="text-[11px] text-[#64748b] font-medium">
                    Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedSupabaseVehicles.length)} de {sortedSupabaseVehicles.length} registros
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPageVeiculos(prev => Math.max(1, prev - 1))}
                      disabled={activePage === 1}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, idx) => {
                      const pageNum = idx + 1;
                      const isNearCurrent = Math.abs(pageNum - activePage) <= 1;
                      const isFirstOrLast = pageNum === 1 || pageNum === totalPages;

                      if (!isNearCurrent && !isFirstOrLast) {
                        if (pageNum === 2 || pageNum === totalPages - 1) {
                          return <span key={`dots-v-${pageNum}`} className="text-xxs text-[#64748b] px-1 font-bold">...</span>;
                        }
                        return null;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPageVeiculos(pageNum)}
                          className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-bold transition-all ${activePage === pageNum
                              ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-900/20'
                              : 'border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPageVeiculos(prev => Math.min(totalPages, prev + 1))}
                      disabled={activePage === totalPages}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal de Confirmação de Exclusão de Veículo */}
        <AnimatePresence>
          {isExcluindoVeiculo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isDeletingVeiculo && setIsExcluindoVeiculo(null)}
                className="absolute inset-0 bg-[#06080d]/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white light-theme:text-slate-800 text-base">Excluir Veículo?</h3>
                    <p className="text-xxs text-[#64748b] mt-1 leading-relaxed">
                      Você tem certeza que deseja excluir o veículo de placa <strong>"{isExcluindoVeiculo.placa || 'Sem Placa'}"</strong>? Esta ação não pode ser desfeita e pode afetar lançamentos vinculados.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    onClick={() => setIsExcluindoVeiculo(null)}
                    disabled={isDeletingVeiculo}
                    className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteVeiculo}
                    disabled={isDeletingVeiculo}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-600/10 transition-colors"
                  >
                    {isDeletingVeiculo ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    <span>Confirmar Exclusão</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderFormaPagamento = () => {
    // 1. Ordenação alfabética (descrição) e Paginação
    const sortedSupabaseFormaPagamento = [...filteredSupabaseFormaPagamento].sort((a, b) => {
      return (a.descricao || '').localeCompare(b.descricao || '', 'pt-BR');
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(sortedSupabaseFormaPagamento.length / itemsPerPage);
    const activePage = Math.max(1, Math.min(currentPageFormaPagamento, totalPages || 1));
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedSupabaseFormaPagamento.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="h-full flex flex-col gap-4 w-full min-h-0">
        <div className={`${formaPagamentoFormMode === 'list' ? 'flex-1 min-h-0 w-full' : 'w-full max-w-3xl h-fit max-h-full flex flex-col min-h-0'} bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden`}>
          {formaPagamentoFormMode !== 'list' ? (
            <form onSubmit={handleSaveFormaPagamento} className="flex flex-col min-h-0 w-full py-2 text-left gap-5">
              <div className="flex items-center justify-between border-b border-[#1f2433] light-theme:border-slate-100 pb-3 flex-shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">
                    {formaPagamentoFormMode === 'create' ? 'Cadastrar Nova Forma de Pagamento' : 'Editar Forma de Pagamento'}
                  </h3>
                  <p className="text-[10px] text-[#64748b] mt-1">Preencha os dados do método de pagamento no Supabase.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormaPagamentoFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 border border-[#1f2433] light-theme:border-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Voltar para a Lista</span>
                </button>
              </div>

              {formFormaPagamentoError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formFormaPagamentoError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0 py-1">
                {/* Status Toggle Box (Premium Layout) */}
                <div className="flex items-center justify-between md:col-span-2 bg-[#090b11]/45 light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 px-6 py-5 rounded-2xl shadow-sm">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white light-theme:text-[#334155] tracking-wide">
                      {formFormaPagamentoAtivo ? 'Forma de Pagamento Ativa' : 'Forma de Pagamento Inativa'}
                    </span>
                    <span className="text-[10px] text-[#64748b] font-medium mt-1 leading-relaxed">
                      Habilitar forma de pagamento para fluxos de entradas e despesas
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormFormaPagamentoAtivo(!formFormaPagamentoAtivo)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formFormaPagamentoAtivo ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.55)]' : 'bg-slate-700 light-theme:bg-slate-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        formFormaPagamentoAtivo ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Descrição */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Descrição *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cartão de Crédito Visa, PIX Sicredi"
                    value={formFormaPagamentoDescricao}
                    onChange={e => setFormFormaPagamentoDescricao(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Tipo de Transação */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Tipo de Transação *</label>
                  <select
                    value={formFormaPagamentoTipoTransacao}
                    onChange={e => setFormFormaPagamentoTipoTransacao(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="PIX" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">PIX</option>
                    <option value="DINHEIRO" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">DINHEIRO</option>
                    <option value="CRÉDITO" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">CRÉDITO</option>
                    <option value="DÉBITO" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">DÉBITO</option>
                    <option value="BOLETO" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">BOLETO</option>
                    <option value="TRANSFERÊNCIA" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">TRANSFERÊNCIA</option>
                    <option value="OUTROS" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">OUTROS</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-start gap-3 mt-4 border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setFormaPagamentoFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formFormaPagamentoSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-violet-900/20 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formFormaPagamentoSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Salvar Forma de Pagamento</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Listagem de Formas de Pagamento</h3>
                  {sortedSupabaseFormaPagamento.length > 0 && (
                    <p className="text-[10px] text-cyan-400 font-semibold mt-1">
                      Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedSupabaseFormaPagamento.length)} de {sortedSupabaseFormaPagamento.length} registros
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Botão para Lançamento de Nova Forma de Pagamento */}
                  <button
                    type="button"
                    onClick={handleOpenCreateFormaPagamento}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-lg shadow-violet-900/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mr-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Nova Forma de Pagamento</span>
                  </button>

                  <div className="relative w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Buscar por descrição ou tipo..."
                      value={searchSupabaseFormaPagamento}
                      onChange={e => {
                        setSearchSupabaseFormaPagamento(e.target.value);
                        setCurrentPageFormaPagamento(1);
                      }}
                      className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar w-full pr-2">
                {sortedSupabaseFormaPagamento.length === 0 ? (
                  <div className="h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
                    <Wallet className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
                    <span className="text-xs">Nenhuma forma de pagamento registrada no Supabase</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {currentItems.map(item => (
                      <div key={item.id} className="p-5 rounded-2xl bg-[#090b11]/55 light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 flex flex-col justify-between h-28 relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 h-10 w-10 bg-violet-600/5 rounded-tl-3xl pointer-events-none group-hover:scale-150 transition-transform" />

                        <div className="flex items-start justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center flex-shrink-0">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-bold text-white light-theme:text-slate-800 text-xs leading-none">{item.descricao}</h4>
                              <span className="text-[10px] text-[#64748b] font-medium block mt-1.5 leading-none">Tipo: {item.tipo_transacao}</span>
                            </div>
                          </div>

                          {/* Top-Right status and action buttons */}
                          <div className="flex items-center gap-2 relative z-10">
                            <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-rose-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleOpenEditFormaPagamento(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-200 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-300 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Editar Cadastro"
                              >
                                <Pencil className="h-2.5 w-2.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsExcluindoFormaPagamento(item)}
                                className="p-1 rounded bg-[#161924] light-theme:bg-slate-200 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-300 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                title="Excluir Cadastro"
                              >
                                <Trash2 className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-[#1f2433] light-theme:border-slate-200 pt-4 mt-4 flex-wrap gap-4 w-full">
                  <span className="text-[11px] text-[#64748b] font-medium">
                    Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedSupabaseFormaPagamento.length)} de {sortedSupabaseFormaPagamento.length} registros
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPageFormaPagamento(prev => Math.max(1, prev - 1))}
                      disabled={activePage === 1}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, idx) => {
                      const pageNum = idx + 1;
                      const isNearCurrent = Math.abs(pageNum - activePage) <= 1;
                      const isFirstOrLast = pageNum === 1 || pageNum === totalPages;

                      if (!isNearCurrent && !isFirstOrLast) {
                        if (pageNum === 2 || pageNum === totalPages - 1) {
                          return <span key={`dots-fp-${pageNum}`} className="text-xxs text-[#64748b] px-1 font-bold">...</span>;
                        }
                        return null;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPageFormaPagamento(pageNum)}
                          className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-bold transition-all ${activePage === pageNum
                              ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-900/20'
                              : 'border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPageFormaPagamento(prev => Math.min(totalPages, prev + 1))}
                      disabled={activePage === totalPages}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal de Confirmação de Exclusão de Forma de Pagamento */}
        <AnimatePresence>
          {isExcluindoFormaPagamento && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isDeletingFormaPagamento && setIsExcluindoFormaPagamento(null)}
                className="absolute inset-0 bg-[#06080d]/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white light-theme:text-slate-800 text-base">Excluir Forma de Pagamento?</h3>
                    <p className="text-xxs text-[#64748b] mt-1 leading-relaxed">
                      Você tem certeza que deseja excluir a forma de pagamento <strong>"{isExcluindoFormaPagamento.descricao || 'Sem Descrição'}"</strong>? Esta ação não pode ser desfeita e pode afetar lançamentos vinculados.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    onClick={() => setIsExcluindoFormaPagamento(null)}
                    disabled={isDeletingFormaPagamento}
                    className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteFormaPagamento}
                    disabled={isDeletingFormaPagamento}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-600/10 transition-colors"
                  >
                    {isDeletingFormaPagamento ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    <span>Confirmar Exclusão</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderCentroCusto = () => {
    // 1. Ordenação alfabética (nome_centro_custo) e Paginação
    const sortedSupabaseCentroCusto = [...filteredSupabaseCentroCusto].sort((a, b) => {
      return (a.nome_centro_custo || '').localeCompare(b.nome_centro_custo || '', 'pt-BR');
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(sortedSupabaseCentroCusto.length / itemsPerPage);
    const activePage = Math.max(1, Math.min(currentPageCentroCusto, totalPages || 1));
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedSupabaseCentroCusto.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="h-full flex flex-col gap-4 w-full min-h-0">
        <div className={`${centroCustoFormMode === 'list' ? 'flex-1 min-h-0 w-full' : 'w-full max-w-3xl h-fit max-h-full flex flex-col min-h-0'} bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden`}>
          {centroCustoFormMode !== 'list' ? (
            <form onSubmit={handleSaveCentroCusto} className="flex flex-col min-h-0 w-full py-2 text-left gap-5">
              <div className="flex items-center justify-between border-b border-[#1f2433] light-theme:border-slate-100 pb-3 flex-shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">
                    {centroCustoFormMode === 'create' ? 'Cadastrar Novo Centro de Custo' : 'Editar Centro de Custo'}
                  </h3>
                  <p className="text-[10px] text-[#64748b] mt-1">Preencha os dados do centro de custo no Supabase.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCentroCustoFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 border border-[#1f2433] light-theme:border-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Voltar para a Lista</span>
                </button>
              </div>

              {formCentroCustoError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formCentroCustoError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0 py-1">
                {/* Status Toggle Box (Premium Layout) */}
                <div className="flex items-center justify-between md:col-span-2 bg-[#090b11]/45 light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 px-6 py-5 rounded-2xl shadow-sm">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white light-theme:text-[#334155] tracking-wide">
                      {formCentroCustoAtivo ? 'Centro de Custo Ativo' : 'Centro de Custo Inativo'}
                    </span>
                    <span className="text-[10px] text-[#64748b] font-medium mt-1 leading-relaxed">
                      Habilitar centro de custo para transações e relatórios fiscais
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormCentroCustoAtivo(!formCentroCustoAtivo)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formCentroCustoAtivo ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.55)]' : 'bg-slate-700 light-theme:bg-slate-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        formCentroCustoAtivo ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Nome do Centro de Custos */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Nome do Centro de Custos *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Combustível, Salários, Taxas Administrativas"
                    value={formCentroCustoNome}
                    onChange={e => setFormCentroCustoNome(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Descrição */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Descrição</label>
                  <input
                    type="text"
                    placeholder="Ex: Despesas gerais com a frota ou infraestrutura"
                    value={formCentroCustoDescricao}
                    onChange={e => setFormCentroCustoDescricao(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                {/* Tipo de Movimentação */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Tipo de Movimentação *</label>
                  <select
                    value={formCentroCustoTipoMovimentacao}
                    onChange={e => setFormCentroCustoTipoMovimentacao(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="ENTRADA" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">ENTRADA</option>
                    <option value="DESPESA" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">DESPESA</option>
                    <option value="OUTROS" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">OUTROS</option>
                  </select>
                </div>

                {/* Tipo de Recorrência */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Recorrência *</label>
                  <select
                    value={formCentroCustoTipoRecorrencia}
                    onChange={e => setFormCentroCustoTipoRecorrencia(e.target.value)}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="Não Informado" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">Não Informado</option>
                    <option value="Fixo" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">Fixo</option>
                    <option value="Variável" className="bg-[#0e111a] light-theme:bg-white text-white light-theme:text-slate-800">Variável</option>
                  </select>
                </div>

                {/* Valor de Provisão */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Valor Provisão Padrão *</label>
                  <input
                    type="text"
                    required
                    placeholder="R$ 0,00"
                    value={formCentroCustoValorProvisao === 0 ? '' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(formCentroCustoValorProvisao)}
                    onChange={e => {
                      const rawDigits = e.target.value.replace(/\D/g, '');
                      if (!rawDigits) {
                        setFormCentroCustoValorProvisao(0);
                        return;
                      }
                      const cents = parseInt(rawDigits, 10);
                      setFormCentroCustoValorProvisao(cents / 100);
                    }}
                    className="w-full bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 px-3 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-start gap-3 mt-4 border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setCentroCustoFormMode('list')}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formCentroCustoSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-violet-900/20 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formCentroCustoSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Salvar Centro de Custo</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Listagem de Centro de Custos</h3>
                  {sortedSupabaseCentroCusto.length > 0 && (
                    <p className="text-[10px] text-cyan-400 font-semibold mt-1">
                      Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedSupabaseCentroCusto.length)} de {sortedSupabaseCentroCusto.length} registros
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Botão para Lançamento de Novo Centro de Custo */}
                  <button
                    type="button"
                    onClick={handleOpenCreateCentroCusto}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-lg shadow-violet-900/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mr-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Novo Centro de Custo</span>
                  </button>

                  <div className="relative w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Buscar centro de custos..."
                      value={searchSupabaseCentroCusto}
                      onChange={e => {
                        setSearchSupabaseCentroCusto(e.target.value);
                        setCurrentPageCentroCusto(1);
                      }}
                      className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar w-full pr-2">
                {sortedSupabaseCentroCusto.length === 0 ? (
                  <div className="h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
                    <Layers className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
                    <span className="text-xs">Nenhum centro de custo registrado no Supabase</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {currentItems.map(item => {
                      const movLower = String(item.tipo_movimentacao || '').toLowerCase();
                      const isEntrada = movLower.includes('entrada') || movLower.includes('receita');
                      const isDespesa = movLower.includes('despesa') || movLower.includes('custo') || movLower.includes('saida') || movLower.includes('saída');

                      let dotBg = 'bg-slate-500';
                      let typeLabel = 'Outros';
                      if (isEntrada) {
                        dotBg = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
                        typeLabel = 'Entrada';
                      } else if (isDespesa) {
                        dotBg = 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]';
                        typeLabel = 'Despesa';
                      }

                      const recStr = String(item.tipo_recorrencia || '').trim();
                      const hasRecorrencia = recStr.length > 0 && recStr.toLowerCase() !== 'não informado' && recStr.toLowerCase() !== 'null';

                      return (
                        <div key={item.id} className="p-5 rounded-2xl bg-[#090b11]/55 light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 flex flex-col justify-between h-28 relative overflow-hidden group">
                          <div className="absolute right-0 bottom-0 h-10 w-10 bg-cyan-600/5 rounded-tl-3xl pointer-events-none group-hover:scale-150 transition-transform" />

                          <div className="flex items-start justify-between w-full">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-xl bg-cyan-600/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
                                <Layers className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-bold text-white light-theme:text-slate-800 text-xs leading-none">
                                    {item.nome_centro_custo}
                                  </h4>
                                  {hasRecorrencia && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-violet-600/15 text-violet-400 light-theme:bg-slate-200 light-theme:text-slate-600 border border-violet-500/10 leading-none">
                                      {recStr.toLowerCase().includes('fixo') ? 'Fixo' :
                                        recStr.toLowerCase().includes('varia') ? 'Variável' :
                                          recStr}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-[#64748b] font-medium block mt-1.5 leading-none">
                                  {item.descricao || 'Sem Descrição'}
                                </span>
                              </div>
                            </div>

                            {/* Top-Right status, type badge and action buttons */}
                            <div className="flex items-center gap-2 relative z-10">
                              <div className="flex items-center gap-1 bg-[#090b11]/40 light-theme:bg-slate-200/50 px-1.5 py-0.5 rounded border border-[#1f2433]/30">
                                <span className={`h-1.5 w-1.5 rounded-full ${dotBg} animate-pulse`} />
                                <span className="text-[7px] font-bold text-[#64748b] light-theme:text-slate-500 uppercase tracking-wider">{typeLabel}</span>
                              </div>
                              <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-rose-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditCentroCusto(item)}
                                  className="p-1 rounded bg-[#161924] light-theme:bg-slate-200 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-300 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Editar Cadastro"
                                >
                                  <Pencil className="h-2.5 w-2.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setIsExcluindoCentroCusto(item)}
                                  className="p-1 rounded bg-[#161924] light-theme:bg-slate-200 hover:bg-rose-600/15 light-theme:hover:bg-rose-600/10 border border-[#1f2433] light-theme:border-slate-300 hover:border-rose-500/30 light-theme:hover:border-rose-500/20 text-[#64748b] light-theme:text-slate-500 hover:text-rose-400 light-theme:hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Excluir Cadastro"
                                >
                                  <Trash2 className="h-2.5 w-2.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-auto border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-2 w-full">
                            <span className="text-[8px] text-[#64748b]/60 uppercase tracking-widest leading-none">Provisão</span>
                            <span className="text-cyan-400 font-bold text-[11px] leading-none">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_provisao || 0)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-[#1f2433] light-theme:border-slate-200 pt-4 mt-4 flex-wrap gap-4 w-full">
                  <span className="text-[11px] text-[#64748b] font-medium">
                    Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedSupabaseCentroCusto.length)} de {sortedSupabaseCentroCusto.length} registros
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPageCentroCusto(prev => Math.max(1, prev - 1))}
                      disabled={activePage === 1}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, idx) => {
                      const pageNum = idx + 1;
                      const isNearCurrent = Math.abs(pageNum - activePage) <= 1;
                      const isFirstOrLast = pageNum === 1 || pageNum === totalPages;

                      if (!isNearCurrent && !isFirstOrLast) {
                        if (pageNum === 2 || pageNum === totalPages - 1) {
                          return <span key={`dots-cc-${pageNum}`} className="text-xxs text-[#64748b] px-1 font-bold">...</span>;
                        }
                        return null;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPageCentroCusto(pageNum)}
                          className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-bold transition-all ${activePage === pageNum
                              ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-900/20'
                              : 'border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPageCentroCusto(prev => Math.min(totalPages, prev + 1))}
                      disabled={activePage === totalPages}
                      className="p-1.5 rounded-lg border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal de Confirmação de Exclusão de Centro de Custo */}
        <AnimatePresence>
          {isExcluindoCentroCusto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isDeletingCentroCusto && setIsExcluindoCentroCusto(null)}
                className="absolute inset-0 bg-[#06080d]/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />

                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white light-theme:text-slate-800 text-base">Excluir Centro de Custo?</h3>
                    <p className="text-xxs text-[#64748b] mt-1 leading-relaxed">
                      Você tem certeza que deseja excluir o centro de custo <strong>"{isExcluindoCentroCusto.nome_centro_custo || 'Sem Nome'}"</strong>? Esta ação não pode ser desfeita e pode afetar lançamentos vinculados.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    onClick={() => setIsExcluindoCentroCusto(null)}
                    disabled={isDeletingCentroCusto}
                    className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 light-theme:hover:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 text-[#94a3b8] light-theme:text-slate-500 font-bold text-xs transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteCentroCusto}
                    disabled={isDeletingCentroCusto}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-600/10 transition-colors"
                  >
                    {isDeletingCentroCusto ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    <span>Confirmar Exclusão</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderOrdemServico = () => {
    const mockOrders = [
      { id: 'os-1', plate: 'BRA2E20', model: 'Honda Civic', customer: 'Marcos Silva', service: 'Lavagem Completa + Cera', price: 120.00, status: 'executing' },
      { id: 'os-2', plate: 'OSB5H90', model: 'Toyota Corolla', customer: 'Arthur Lima', service: 'Polimento Técnico + Proteção', price: 450.00, status: 'waiting' },
      { id: 'os-3', plate: 'ENL8X05', model: 'Jeep Compass', customer: 'Amanda Costa', service: 'Higienização Interna Completa', price: 280.00, status: 'done' },
      { id: 'os-4', plate: 'PPA3K01', model: 'Chevrolet Onix', customer: 'Lucas Santos', service: 'Lavagem Simples + Aspiração', price: 70.00, status: 'waiting' },
      { id: 'os-5', plate: 'DFK2P00', model: 'Volkswagen Golf', customer: 'Gabriela Alves', service: 'Polimento dos Faróis', price: 150.00, status: 'executing' },
    ];

    const columns = [
      { id: 'waiting', name: 'Aguardando na Fila', color: 'border-t-yellow-500 bg-yellow-500/5' },
      { id: 'executing', name: 'Na Rampa / Lavando', color: 'border-t-cyan-500 bg-cyan-500/5' },
      { id: 'done', name: 'Pronto / Finalizado', color: 'border-t-emerald-500 bg-emerald-500/5' },
    ];

    return (
      <div className="h-full flex flex-col gap-4 w-full">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 flex-shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">AGUARDANDO ATENDIMENTO</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {mockOrders.filter(o => o.status === 'waiting').length} Veículos na Fila
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">EM EXECUÇÃO</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {mockOrders.filter(o => o.status === 'executing').length} Veículos na Rampa
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <CheckCircle className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">CONCLUÍDOS (HOJE)</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {mockOrders.filter(o => o.status === 'done').length} Serviços Concluídos
              </h4>
            </div>
          </div>
        </div>

        {/* Board Columns Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden w-full">
          {columns.map(col => {
            const ordersInCol = mockOrders.filter(o => o.status === col.id);
            return (
              <div key={col.id} className={`flex flex-col rounded-2xl bg-[#0e111a] light-theme:bg-white border-t-2 border-x border-b border-[#1f2433] light-theme:border-slate-200 p-4 ${col.color} overflow-hidden h-[calc(100vh-270px)]`}>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1f2433]/40 light-theme:border-slate-100 flex-shrink-0">
                  <h4 className="font-bold text-white light-theme:text-slate-800 text-xs flex items-center gap-2">
                    {col.name}
                    <span className="h-5 w-5 rounded-full bg-[#161924] light-theme:bg-slate-100 text-[10px] font-bold flex items-center justify-center text-[#94a3b8] flex-shrink-0">
                      {ordersInCol.length}
                    </span>
                  </h4>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar w-full">
                  {ordersInCol.map(order => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 hover:border-cyan-500/40 transition-all cursor-grab relative overflow-hidden group select-none shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-white/5 border border-white/10 text-cyan-400 text-[10px] uppercase tracking-wide leading-none">
                            {order.plate}
                          </span>
                          <h5 className="font-bold text-white light-theme:text-slate-800 text-xs mt-2.5 leading-none">{order.model}</h5>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 leading-none">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.price)}
                        </span>
                      </div>

                      <div className="mt-3 text-[10px] font-medium text-[#94a3b8] light-theme:text-slate-500 leading-relaxed">
                        <span className="block font-semibold text-slate-300 light-theme:text-slate-700">Serviço: {order.service}</span>
                        <span className="block text-[#64748b] mt-0.5">Cliente: {order.customer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMigrationScreenControlHeader = () => {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 shadow-xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center flex-shrink-0">
            <Cloud className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-white light-theme:text-slate-800 text-xs leading-none">Mapeador de Tabelas Bubble.io</h3>
            <p className="text-[10px] text-[#64748b] mt-1 leading-none">Selecione e sincronize as tabelas para produção no Supabase.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Table Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 py-2 rounded-xl bg-[#090b11] light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 text-xs text-white light-theme:text-slate-800 font-bold flex items-center gap-2 hover:border-violet-500 transition-all cursor-pointer"
            >
              <Menu className="h-4 w-4" />
              <span>Tabela: {activeForm === 'pessoas' ? 'Pessoas' : activeForm === 'veiculos' ? 'Veículos' : activeForm === 'centrocusto' ? 'Centro de Custos' : activeForm === 'formapagamento' ? 'Formas de Pagamento' : activeForm === 'mensalistas' ? 'Mensalistas' : activeForm === 'mensalistaparcelas' ? 'Mensalistas Parcelas' : activeForm === 'metas' ? 'Metas' : activeForm === 'despesas' ? 'Despesas' : 'Entradas'}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-60 rounded-xl bg-[#0e111a] border border-[#1f2433] shadow-2xl p-2 z-50 flex flex-col gap-1">
                  {[
                    { id: 'pessoas', name: 'Pessoas', icon: User },
                    { id: 'veiculos', name: 'Veículos', icon: Car },
                    { id: 'centrocusto', name: 'Centro de Custos', icon: CreditCard },
                    { id: 'formapagamento', name: 'Formas de Pagamento', icon: Wallet },
                    { id: 'mensalistas', name: 'Mensalistas', icon: Calendar },
                    { id: 'mensalistaparcelas', name: 'Mensalistas Parcelas', icon: Layers },
                    { id: 'metas', name: 'Metas', icon: Target },
                    { id: 'despesas', name: 'Despesas', icon: DollarSign },
                    { id: 'entradas', name: 'Entradas', icon: ArrowRightLeft }
                  ].map(opt => {
                    const OptIcon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => { setActiveForm(opt.id as any); setIsMenuOpen(false); }}
                        className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all ${activeForm === opt.id
                          ? 'bg-violet-600 text-white'
                          : 'hover:bg-white/5 text-[#94a3b8]'
                          }`}
                      >
                        <OptIcon className="h-4 w-4" />
                        <span>{opt.name}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Wipe Database Button */}
          <button
            type="button"
            onClick={() => setIsConfirmingWipe(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Limpar Tabelas</span>
          </button>

          {/* Start Migration Button */}
          <button
            type="button"
            onClick={
              activeForm === 'pessoas' ? handleStartMigration :
                activeForm === 'veiculos' ? handleStartVehiclesMigration :
                  activeForm === 'centrocusto' ? handleStartCentroCustoMigration :
                    activeForm === 'formapagamento' ? handleStartFormaPagamentoMigration :
                      activeForm === 'mensalistas' ? handleStartMensalistasMigration :
                        activeForm === 'mensalistaparcelas' ? handleStartMensalistaParcelasMigration :
                          activeForm === 'metas' ? handleStartMetasMigration :
                            activeForm === 'despesas' ? handleStartDespesasMigration :
                              handleStartEntradasMigration
            }
            disabled={
              activeForm === 'pessoas' ? bubbleData.length === 0 :
                activeForm === 'veiculos' ? bubbleVehicles.length === 0 :
                  activeForm === 'centrocusto' ? bubbleCentroCusto.length === 0 :
                    activeForm === 'formapagamento' ? bubbleFormaPagamento.length === 0 :
                      activeForm === 'mensalistas' ? bubbleMensalistas.length === 0 :
                        activeForm === 'mensalistaparcelas' ? bubbleMensalistaParcelas.length === 0 :
                          activeForm === 'metas' ? bubbleMetas.length === 0 :
                            activeForm === 'despesas' ? bubbleDespesas.length === 0 :
                              bubbleEntradas.length === 0
            }
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Sincronizar Banco</span>
          </button>
        </div>
      </div>
    );
  };

  const fetchBubbleData = async () => {
    setLoadingBubble(true);
    try {
      let allRecords: any[] = [];
      let cursor = 0;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`${BUBBLE_URL}?cursor=${cursor}`, {
          headers: { Authorization: `Bearer ${BUBBLE_TOKEN}` }
        });
        if (!res.ok) throw new Error('Falha ao buscar do Bubble');
        const json = await res.json();
        const records = json.response.results || [];
        allRecords = allRecords.concat(records);

        const count = json.response.count || 0;
        const remaining = json.response.remaining || 0;
        if (remaining > 0) {
          cursor += count;
        } else {
          hasMore = false;
        }
      }

      // Map Bubble structure to our clean schema
      const mapped: Pessoa[] = allRecords.map((item: any) => ({
        id: item._id,
        nome_pessoa: item.nomePessoa || item.nomeContato || item.razaoSocial || 'Sem Nome',
        tipo_pessoa: item.tipoPessoa || 'Não Informado',
        celular_whatsapp: item.celularWhatsapp || item.telefone || 'N/A',
        cpf: item.cpf || 'N/A',
        cnpj: item.cnpj || 'N/A',
        cidade: item.cidade || 'N/A',
        uf: item.uf || 'N/A',
        ativo: item.ativo !== undefined ? item.ativo : true,
        raw: item
      }));

      setBubbleData(mapped);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao carregar dados do Bubble.io: ' + error.message);
    } finally {
      setLoadingBubble(false);
    }
  };

  // Fetch all data from Supabase
  const fetchSupabaseData = async () => {
    setLoadingSupabase(true);
    try {
      let allRecords: any[] = [];
      let offset = 0;
      let hasMore = true;
      const limit = 1000;

      while (hasMore) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/pessoas?select=*&order=nome_pessoa.asc&limit=${limit}&offset=${offset}`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`
          }
        });
        if (!res.ok) throw new Error('Falha ao buscar do Supabase');
        const json = await res.json();
        const records = json || [];
        allRecords = allRecords.concat(records);

        if (records.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }
      setSupabaseData(allRecords);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingSupabase(false);
    }
  };

  // Truncate/Clear all Supabase tables using Cascade Delete
  const handleClearDatabase = async () => {
    setWiping(true);
    let table = 'pessoas';
    if (activeForm === 'veiculos') table = 'veiculos';
    if (activeForm === 'centrocusto') table = 'centrocusto';
    if (activeForm === 'formapagamento') table = 'formapagamento';
    if (activeForm === 'mensalistas') table = 'mensalistas';
    if (activeForm === 'mensalistaparcelas') table = 'mensalistaparcelas';
    if (activeForm === 'metas') table = 'metas';
    if (activeForm === 'despesas') table = 'despesas';
    if (activeForm === 'entradas') table = 'entradas';

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=not.is.null`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });

      if (!res.ok) {
        throw new Error(`Falha ao limpar os dados de ${table} no Supabase.`);
      }

      if (activeForm === 'pessoas') {
        setSupabaseData([]);
      } else if (activeForm === 'veiculos') {
        setSupabaseVehicles([]);
      } else if (activeForm === 'centrocusto') {
        setSupabaseCentroCusto([]);
      } else if (activeForm === 'formapagamento') {
        setSupabaseFormaPagamento([]);
      } else if (activeForm === 'mensalistas') {
        setSupabaseMensalistas([]);
      } else if (activeForm === 'mensalistaparcelas') {
        setSupabaseMensalistaParcelas([]);
      } else if (activeForm === 'metas') {
        setSupabaseMetas([]);
      } else if (activeForm === 'despesas') {
        setSupabaseDespesas([]);
      } else if (activeForm === 'entradas') {
        setSupabaseEntradas([]);
      }
      setIsConfirmingWipe(false);
      alert(`Banco de dados de ${table} do Supabase esvaziado com sucesso!`);
    } catch (error: any) {
      alert('Erro ao esvaziar banco de dados: ' + error.message);
    } finally {
      setWiping(false);
    }
  };

  // Start the Migration Process
  const handleStartMigration = async () => {
    if (bubbleData.length === 0) {
      alert('Carregue os dados do Bubble.io primeiro!');
      return;
    }

    setIsModalOpen(true);
    setMigrationStatus('running');
    setProgress(0);
    setMigratedCount(0);
    setTotalToMigrate(bubbleData.length);
    setLogs(['Iniciando migração dos dados...', `Total de registros a migrar: ${bubbleData.length}`]);

    let successCount = 0;

    for (let i = 0; i < bubbleData.length; i++) {
      const item = bubbleData[i];
      const percent = Math.round(((i + 1) / bubbleData.length) * 100);

      setLogs(prev => [...prev, `[${i + 1}/${bubbleData.length}] Enviando: ${item.nome_pessoa}...`]);

      try {
        const rec = item.raw || {};

        // Map full fields exactly using correct CamelCase properties
        const fieldsToSave = {
          id: rec._id,
          ativo: rec.ativo !== undefined ? rec.ativo : true,
          barrio: rec.barrio || null,
          celular_whatsapp: rec.celularWhatsapp || rec.telefone || null,
          cep: rec.cep || null,
          cidade: rec.cidade || null,
          cnpj: rec.cnpj || null,
          cpf: rec.cpf || null,
          email: rec.email || null,
          endereco: rec.endereco || null,
          inscricao_estadual: rec.inscricaoEstadual || null,
          nome_contato: rec.nomeContato || null,
          nome_pessoa: rec.nomePessoa || rec.razaoSocial || rec.nomeContato || 'Sem Nome',
          razao_social: rec.razaoSocial || null,
          telefone: rec.telefone || null,
          tipo_pessoa: rec.tipoPessoa || null,
          uf: rec.uf || null,
          created_at: rec['Created Date'] || null,
          updated_at: rec['Modified Date'] || null,
          created_by: rec['Created By'] || null,
          slug: rec.Slug || null
        };

        // Post to Supabase REST API (performing UPSERT)
        const subRes = await fetch(`${SUPABASE_URL}/rest/v1/pessoas?on_conflict=id`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates' // Handle UPSERT automatically
          },
          body: JSON.stringify(fieldsToSave)
        });

        if (!subRes.ok) {
          throw new Error(`Código ${subRes.status}: ${subRes.statusText}`);
        }

        successCount++;
        setMigratedCount(successCount);
        setLogs(prev => [...prev, `✔️ ${item.nome_pessoa} migrado com sucesso.`]);
      } catch (err: any) {
        setLogs(prev => [...prev, `❌ Falha ao migrar ${item.nome_pessoa}: ${err.message}`]);
      }

      setProgress(percent);
      // Brief interval to make the logging visual look fantastic
      await new Promise(r => setTimeout(r, 60));
    }

    setMigrationStatus('success');
    setLogs(prev => [...prev, `\n🎉 Processo concluído! Sucesso: ${successCount}/${bubbleData.length}`]);
    fetchSupabaseData();
  };

  // Fetch all Veículos from Bubble
  const fetchBubbleVehicles = async () => {
    setLoadingBubbleVehicles(true);
    try {
      let allRecords: any[] = [];
      let cursor = 0;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`https://lavajatobr050.com/version-test/api/1.1/obj/Veiculos?cursor=${cursor}`, {
          headers: { Authorization: `Bearer ${BUBBLE_TOKEN}` }
        });
        if (!res.ok) throw new Error('Falha ao buscar Veículos do Bubble');
        const json = await res.json();
        const records = json.response.results || [];
        allRecords = allRecords.concat(records);

        const count = json.response.count || 0;
        const remaining = json.response.remaining || 0;
        if (remaining > 0) {
          cursor += count;
        } else {
          hasMore = false;
        }
      }

      // Map Bubble structure to our clean Veiculos schema
      const mapped: Veiculo[] = allRecords.map((item: any) => ({
        id: item._id,
        ativo: item.ativo !== undefined ? item.ativo : true,
        placa: item.placa || 'N/A',
        marca_modelo: item.marcaModelo || 'Sem Modelo',
        tipo: item.tipo || 'Não Informado',
        pessoa_id: item.Pessoa || null,
        pessoa_nome: item.pessoaNome || 'N/A',
        motorista: item.motorista || [],
        created_at: item['Created Date'] || null,
        updated_at: item['Modified Date'] || null,
        created_by: item['Created By'] || null,
        raw: item
      }));

      setBubbleVehicles(mapped);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao carregar veículos do Bubble.io: ' + error.message);
    } finally {
      setLoadingBubbleVehicles(false);
    }
  };

  // Fetch all Veículos from Supabase
  const fetchSupabaseVehicles = async () => {
    setLoadingSupabaseVehicles(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/veiculos?select=*&order=placa.asc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (!res.ok) throw new Error('Falha ao buscar veículos do Supabase');
      const json = await res.json();
      setSupabaseVehicles(json);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingSupabaseVehicles(false);
    }
  };

  // Start the Vehicles Migration Process
  const handleStartVehiclesMigration = async () => {
    if (bubbleVehicles.length === 0) {
      alert('Carregue os dados de veículos do Bubble.io primeiro!');
      return;
    }

    setIsModalOpen(true);
    setMigrationStatus('running');
    setProgress(0);
    setMigratedCount(0);
    setTotalToMigrate(bubbleVehicles.length);
    setLogs(['Iniciando migração de veículos...', `Total de registros a migrar: ${bubbleVehicles.length}`]);

    let successCount = 0;

    for (let i = 0; i < bubbleVehicles.length; i++) {
      const item = bubbleVehicles[i];
      const percent = Math.round(((i + 1) / bubbleVehicles.length) * 100);

      setLogs(prev => [...prev, `[${i + 1}/${bubbleVehicles.length}] Enviando placa: ${item.placa}...`]);

      try {
        const rec = item.raw || {};

        // Map full fields exactly using correct CamelCase properties
        const fieldsToSave = {
          id: rec._id,
          ativo: rec.ativo !== undefined ? rec.ativo : true,
          placa: rec.placa || 'N/A',
          marca_modelo: rec.marcaModelo || null,
          tipo: rec.tipo || null,
          pessoa_id: rec.Pessoa || null,
          pessoa_nome: rec.pessoaNome || null,
          motorista: rec.motorista || null, // POSTGREST will process this seamlessly as JSONB
          created_at: rec['Created Date'] || null,
          updated_at: rec['Modified Date'] || null,
          created_by: rec['Created By'] || null,
          slug: rec.Slug || null
        };

        // Post to Supabase REST API (performing UPSERT)
        const subRes = await fetch(`${SUPABASE_URL}/rest/v1/veiculos?on_conflict=id`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(fieldsToSave)
        });

        if (!subRes.ok) {
          throw new Error(`Código ${subRes.status}: ${subRes.statusText}`);
        }

        successCount++;
        setMigratedCount(successCount);
        setLogs(prev => [...prev, `✔️ Placa ${item.placa} migrada com sucesso.`]);
      } catch (err: any) {
        setLogs(prev => [...prev, `❌ Falha ao migrar placa ${item.placa}: ${err.message}`]);
      }

      setProgress(percent);
      await new Promise(r => setTimeout(r, 60));
    }

    setMigrationStatus('success');
    setLogs(prev => [...prev, `\n🎉 Processo concluído! Sucesso: ${successCount}/${bubbleVehicles.length}`]);
    fetchSupabaseVehicles();
  };

  // Fetch all Centro Custo from Bubble
  const fetchBubbleCentroCusto = async () => {
    setLoadingBubbleCentroCusto(true);
    try {
      let allRecords: any[] = [];
      let cursor = 0;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`https://lavajatobr050.com/version-test/api/1.1/obj/CentroCusto?cursor=${cursor}`, {
          headers: { Authorization: `Bearer ${BUBBLE_TOKEN}` }
        });
        if (!res.ok) throw new Error('Falha ao buscar Centro de Custo do Bubble');
        const json = await res.json();
        const records = json.response.results || [];
        allRecords = allRecords.concat(records);

        const count = json.response.count || 0;
        const remaining = json.response.remaining || 0;
        if (remaining > 0) {
          cursor += count;
        } else {
          hasMore = false;
        }
      }

      // Map Bubble structure to our clean Centro Custo schema
      const mapped: CentroCusto[] = allRecords.map((item: any) => ({
        id: item._id,
        ativo: item.ativo !== undefined ? item.ativo : true,
        descricao: item.descricao || 'Sem Descrição',
        nome_centro_custo: item.nomeCentroCusto || 'Sem Nome',
        tipo_recorrencia: item.tipoRecorrencia || 'Não Informado',
        tipo_movimentacao: item.tipoMovimentacao || 'Não Informado',
        valor_provisao: item.valorProvisao || 0,
        created_at: item['Created Date'] || null,
        updated_at: item['Modified Date'] || null,
        created_by: item['Created By'] || null,
        slug: item.Slug || null,
        raw: item
      }));

      setBubbleCentroCusto(mapped);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao carregar centro de custos do Bubble.io: ' + error.message);
    } finally {
      setLoadingBubbleCentroCusto(false);
    }
  };

  // Fetch all Centro Custo from Supabase
  const fetchSupabaseCentroCusto = async () => {
    setLoadingSupabaseCentroCusto(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/centrocusto?select=*&order=nome_centro_custo.asc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (!res.ok) throw new Error('Falha ao buscar centro de custos do Supabase');
      const json = await res.json();
      setSupabaseCentroCusto(json);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingSupabaseCentroCusto(false);
    }
  };

  // Start the Centro Custo Migration Process
  const handleStartCentroCustoMigration = async () => {
    if (bubbleCentroCusto.length === 0) {
      alert('Carregue os dados de centro de custos do Bubble.io primeiro!');
      return;
    }

    setIsModalOpen(true);
    setMigrationStatus('running');
    setProgress(0);
    setMigratedCount(0);
    setTotalToMigrate(bubbleCentroCusto.length);
    setLogs(['Iniciando migração de centro de custos...', `Total de registros a migrar: ${bubbleCentroCusto.length}`]);

    let successCount = 0;

    for (let i = 0; i < bubbleCentroCusto.length; i++) {
      const item = bubbleCentroCusto[i];
      const percent = Math.round(((i + 1) / bubbleCentroCusto.length) * 100);

      setLogs(prev => [...prev, `[${i + 1}/${bubbleCentroCusto.length}] Enviando: ${item.nome_centro_custo}...`]);

      try {
        const rec = item.raw || {};

        const fieldsToSave = {
          id: rec._id,
          ativo: rec.ativo !== undefined ? rec.ativo : true,
          descricao: rec.descricao || null,
          nome_centro_custo: rec.nomeCentroCusto || 'Sem Nome',
          tipo_recorrencia: rec.tipoRecorrencia || null,
          tipo_movimentacao: rec.tipoMovimentacao || null,
          valor_provisao: rec.valorProvisao || 0,
          created_at: rec['Created Date'] || null,
          updated_at: rec['Modified Date'] || null,
          created_by: rec['Created By'] || null,
          slug: rec.Slug || null
        };

        // Post to Supabase REST API (performing UPSERT)
        const subRes = await fetch(`${SUPABASE_URL}/rest/v1/centrocusto?on_conflict=id`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(fieldsToSave)
        });

        if (!subRes.ok) {
          throw new Error(`Código ${subRes.status}: ${subRes.statusText}`);
        }

        successCount++;
        setMigratedCount(successCount);
        setLogs(prev => [...prev, `✔️ Centro Custo ${item.nome_centro_custo} migrado com sucesso.`]);
      } catch (err: any) {
        setLogs(prev => [...prev, `❌ Falha ao migrar centro de custo ${item.nome_centro_custo}: ${err.message}`]);
      }

      setProgress(percent);
      await new Promise(r => setTimeout(r, 60));
    }

    setMigrationStatus('success');
    setLogs(prev => [...prev, `\n🎉 Processo concluído! Sucesso: ${successCount}/${bubbleCentroCusto.length}`]);
    fetchSupabaseCentroCusto();
  };

  // Fetch all Forma de Pagamento from Bubble
  const fetchBubbleFormaPagamento = async () => {
    setLoadingBubbleFormaPagamento(true);
    try {
      let allRecords: any[] = [];
      let cursor = 0;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`${BUBBLE_FORMA_PAGAMENTO_URL}?cursor=${cursor}`, {
          headers: { Authorization: `Bearer ${BUBBLE_TOKEN}` }
        });
        if (!res.ok) throw new Error('Falha ao buscar Forma de Pagamento do Bubble');
        const json = await res.json();
        const records = json.response.results || [];
        allRecords = allRecords.concat(records);

        const count = json.response.count || 0;
        const remaining = json.response.remaining || 0;
        if (remaining > 0) {
          cursor += count;
        } else {
          hasMore = false;
        }
      }

      // Map Bubble structure to our clean schema
      const mapped: FormaPagamento[] = allRecords.map((item: any) => ({
        id: item._id,
        ativo: item.ativo !== undefined ? item.ativo : true,
        descricao: item.descricao || 'Sem Descrição',
        tipo_transacao: item.tipoTransacao || 'Não Informado',
        created_at: item['Created Date'] || null,
        updated_at: item['Modified Date'] || null,
        created_by: item['Created By'] || null,
        slug: item.Slug || null,
        raw: item
      }));

      setBubbleFormaPagamento(mapped);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao carregar formas de pagamento do Bubble.io: ' + error.message);
    } finally {
      setLoadingBubbleFormaPagamento(false);
    }
  };

  // Fetch all Forma de Pagamento from Supabase
  const fetchSupabaseFormaPagamento = async () => {
    setLoadingSupabaseFormaPagamento(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/formapagamento?select=*&order=descricao.asc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (!res.ok) throw new Error('Falha ao buscar formas de pagamento do Supabase');
      const json = await res.json();
      setSupabaseFormaPagamento(json);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingSupabaseFormaPagamento(false);
    }
  };

  // Start the Forma de Pagamento Migration Process
  const handleStartFormaPagamentoMigration = async () => {
    if (bubbleFormaPagamento.length === 0) {
      alert('Carregue os dados de formas de pagamento do Bubble.io primeiro!');
      return;
    }

    setIsModalOpen(true);
    setMigrationStatus('running');
    setProgress(0);
    setMigratedCount(0);
    setTotalToMigrate(bubbleFormaPagamento.length);
    setLogs(['Iniciando migração de formas de pagamento...', `Total de registros a migrar: ${bubbleFormaPagamento.length}`]);

    let successCount = 0;

    for (let i = 0; i < bubbleFormaPagamento.length; i++) {
      const item = bubbleFormaPagamento[i];
      const percent = Math.round(((i + 1) / bubbleFormaPagamento.length) * 100);

      setLogs(prev => [...prev, `[${i + 1}/${bubbleFormaPagamento.length}] Enviando: ${item.descricao}...`]);

      try {
        const rec = item.raw || {};

        const fieldsToSave = {
          id: rec._id,
          ativo: rec.ativo !== undefined ? rec.ativo : true,
          descricao: rec.descricao || 'Sem Descrição',
          tipo_transacao: rec.tipoTransacao || null,
          created_at: rec['Created Date'] || null,
          updated_at: rec['Modified Date'] || null,
          created_by: rec['Created By'] || null,
          slug: rec.Slug || null
        };

        // Post to Supabase REST API (performing UPSERT)
        const subRes = await fetch(`${SUPABASE_URL}/rest/v1/formapagamento?on_conflict=id`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(fieldsToSave)
        });

        if (!subRes.ok) {
          throw new Error(`Código ${subRes.status}: ${subRes.statusText}`);
        }

        successCount++;
        setMigratedCount(successCount);
        setLogs(prev => [...prev, `✔️ Forma de Pagamento ${item.descricao} migrada com sucesso.`]);
      } catch (err: any) {
        setLogs(prev => [...prev, `❌ Falha ao migrar forma de pagamento ${item.descricao}: ${err.message}`]);
      }

      setProgress(percent);
      await new Promise(r => setTimeout(r, 60));
    }

    setMigrationStatus('success');
    setLogs(prev => [...prev, `\n🎉 Processo concluído! Sucesso: ${successCount}/${bubbleFormaPagamento.length}`]);
    fetchSupabaseFormaPagamento();
  };

  // Fetch all Mensalistas from Bubble
  const fetchBubbleMensalistas = async () => {
    setLoadingBubbleMensalistas(true);
    try {
      let allRecords: any[] = [];
      let cursor = 0;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`${BUBBLE_MENSALISTAS_URL}?cursor=${cursor}`, {
          headers: { Authorization: `Bearer ${BUBBLE_TOKEN}` }
        });
        if (!res.ok) throw new Error('Falha ao buscar Mensalistas do Bubble');
        const json = await res.json();
        const records = json.response.results || [];
        allRecords = allRecords.concat(records);

        const count = json.response.count || 0;
        const remaining = json.response.remaining || 0;
        if (remaining > 0) {
          cursor += count;
        } else {
          hasMore = false;
        }
      }

      // Map Bubble structure to our clean schema
      const mapped: Mensalista[] = allRecords.map((item: any) => ({
        id: item._id,
        ativo: item.ativo !== undefined ? item.ativo : true,
        centro_custo_id: item.centroCusto || null,
        dia_vencimento: item.diaVencimento || null,
        marca_modelo: item.marcaModelo || null,
        nome_pessoa: item.nomePessoa || 'Sem Nome',
        observacao: item.observacao || null,
        placa: item.placa || null,
        plano: item.plano || null,
        valor_original: item.valorOriginal || 0,
        veiculo_id: item.Veiculo || null,
        created_at: item['Created Date'] || null,
        updated_at: item['Modified Date'] || null,
        created_by: item['Created By'] || null,
        slug: item.Slug || null,
        raw: item
      }));

      setBubbleMensalistas(mapped);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao carregar mensalistas do Bubble.io: ' + error.message);
    } finally {
      setLoadingBubbleMensalistas(false);
    }
  };

  // Fetch all Mensalistas from Supabase
  const fetchSupabaseMensalistas = async () => {
    setLoadingSupabaseMensalistas(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/mensalistas?select=*&order=nome_pessoa.asc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (!res.ok) throw new Error('Falha ao buscar mensalistas do Supabase');
      const json = await res.json();
      setSupabaseMensalistas(json || []);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingSupabaseMensalistas(false);
    }
  };

  // Start the Mensalistas Migration Process
  const handleStartMensalistasMigration = async () => {
    if (bubbleMensalistas.length === 0) {
      alert('Carregue os dados de mensalistas do Bubble.io primeiro!');
      return;
    }

    setIsModalOpen(true);
    setMigrationStatus('running');
    setProgress(0);
    setMigratedCount(0);
    setTotalToMigrate(bubbleMensalistas.length);
    setLogs(['Iniciando migração de mensalistas...', `Total de registros a migrar: ${bubbleMensalistas.length}`]);

    let successCount = 0;

    for (let i = 0; i < bubbleMensalistas.length; i++) {
      const item = bubbleMensalistas[i];
      const percent = Math.round(((i + 1) / bubbleMensalistas.length) * 100);

      setLogs(prev => [...prev, `[${i + 1}/${bubbleMensalistas.length}] Enviando: ${item.nome_pessoa}...`]);

      try {
        const rec = item.raw || {};

        const fieldsToSave = {
          id: rec._id,
          ativo: rec.ativo !== undefined ? rec.ativo : true,
          centro_custo_id: rec.centroCusto || null,
          dia_vencimento: rec.diaVencimento || null,
          marca_modelo: rec.marcaModelo || null,
          nome_pessoa: rec.nomePessoa || 'Sem Nome',
          observacao: rec.observacao || null,
          placa: rec.placa || null,
          plano: rec.plano || null,
          valor_original: rec.valorOriginal || 0,
          veiculo_id: rec.Veiculo || null,
          created_at: rec['Created Date'] || null,
          updated_at: rec['Modified Date'] || null,
          created_by: rec['Created By'] || null,
          slug: rec.Slug || null
        };

        // Post to Supabase REST API (performing UPSERT)
        const subRes = await fetch(`${SUPABASE_URL}/rest/v1/mensalistas?on_conflict=id`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(fieldsToSave)
        });

        if (!subRes.ok) {
          throw new Error(`Código ${subRes.status}: ${subRes.statusText}`);
        }

        successCount++;
        setMigratedCount(successCount);
        setLogs(prev => [...prev, `✔️ Mensalista ${item.nome_pessoa} migrado com sucesso.`]);
      } catch (err: any) {
        setLogs(prev => [...prev, `❌ Falha ao migrar mensalista ${item.nome_pessoa}: ${err.message}`]);
      }

      setProgress(percent);
      await new Promise(r => setTimeout(r, 60));
    }

    setMigrationStatus('success');
    setLogs(prev => [...prev, `\n🎉 Processo concluído! Sucesso: ${successCount}/${bubbleMensalistas.length}`]);
    fetchSupabaseMensalistas();
  };

  // Fetch all Mensalista Parcelas from Bubble
  const fetchBubbleMensalistaParcelas = async () => {
    setLoadingBubbleMensalistaParcelas(true);
    try {
      let allRecords: any[] = [];
      let cursor = 0;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`${BUBBLE_MENSALISTA_PARCELAS_URL}?cursor=${cursor}`, {
          headers: { Authorization: `Bearer ${BUBBLE_TOKEN}` }
        });
        if (!res.ok) throw new Error('Falha ao buscar Parcelas de Mensalistas do Bubble');
        const json = await res.json();
        const records = json.response.results || [];
        allRecords = allRecords.concat(records);

        const count = json.response.count || 0;
        const remaining = json.response.remaining || 0;
        if (remaining > 0) {
          cursor += count;
        } else {
          hasMore = false;
        }
      }

      // Map Bubble structure to our clean schema
      const mapped: MensalistaParcela[] = allRecords.map((item: any) => ({
        id: item._id,
        data_pagamento: item.dataPagamento || null,
        data_vencimento: item.dataVencimento || null,
        mensalista_id: item.Mensalista || null,
        nome_pessoa: item.nomePessoa || 'Sem Nome',
        valor_original: item.valorOriginal || 0,
        valor_pago: item.valorPago || 0,
        created_at: item['Created Date'] || null,
        updated_at: item['Modified Date'] || null,
        created_by: item['Created By'] || null,
        slug: item.Slug || item._id,
        raw: item
      }));

      setBubbleMensalistaParcelas(mapped);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao carregar parcelas de mensalistas do Bubble.io: ' + error.message);
    } finally {
      setLoadingBubbleMensalistaParcelas(false);
    }
  };

  // Fetch all Mensalista Parcelas from Supabase
  const fetchSupabaseMensalistaParcelas = async () => {
    setLoadingSupabaseMensalistaParcelas(true);
    try {
      let allRecords: any[] = [];
      let offset = 0;
      let hasMore = true;
      const limit = 1000;

      while (hasMore) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/mensalistaparcelas?select=*&order=data_vencimento.asc&limit=${limit}&offset=${offset}`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`
          }
        });
        if (!res.ok) throw new Error('Falha ao buscar parcelas de mensalistas do Supabase');
        const json = await res.json();
        const records = json || [];
        allRecords = allRecords.concat(records);

        if (records.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }
      setSupabaseMensalistaParcelas(allRecords);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingSupabaseMensalistaParcelas(false);
    }
  };

  // Start the Mensalista Parcelas Migration Process
  const handleStartMensalistaParcelasMigration = async () => {
    if (bubbleMensalistaParcelas.length === 0) {
      alert('Carregue os dados de parcelas de mensalistas do Bubble.io primeiro!');
      return;
    }

    setIsModalOpen(true);
    setMigrationStatus('running');
    setProgress(0);
    setMigratedCount(0);
    setTotalToMigrate(bubbleMensalistaParcelas.length);
    setLogs(['Iniciando migração de parcelas de mensalistas...', `Total de registros a migrar: ${bubbleMensalistaParcelas.length}`]);

    let successCount = 0;

    for (let i = 0; i < bubbleMensalistaParcelas.length; i++) {
      const item = bubbleMensalistaParcelas[i];
      const percent = Math.round(((i + 1) / bubbleMensalistaParcelas.length) * 100);

      setLogs(prev => [...prev, `[${i + 1}/${bubbleMensalistaParcelas.length}] Enviando parcela de: ${item.nome_pessoa}...`]);

      try {
        const rec = item.raw || {};

        const fieldsToSave = {
          id: rec._id,
          data_pagamento: rec.dataPagamento || null,
          data_vencimento: rec.dataVencimento || null,
          mensalista_id: rec.Mensalista || null,
          nome_pessoa: rec.nomePessoa || 'Sem Nome',
          valor_original: rec.valorOriginal || 0,
          valor_pago: rec.valorPago || 0,
          created_at: rec['Created Date'] || null,
          updated_at: rec['Modified Date'] || null,
          created_by: rec['Created By'] || null,
          slug: rec.Slug || null
        };

        // Post to Supabase REST API (performing UPSERT)
        const subRes = await fetch(`${SUPABASE_URL}/rest/v1/mensalistaparcelas?on_conflict=id`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(fieldsToSave)
        });

        if (!subRes.ok) {
          const errBody = await subRes.text();
          throw new Error(`Código ${subRes.status}: ${subRes.statusText} - ${errBody}`);
        }

        successCount++;
        setMigratedCount(successCount);
        setLogs(prev => [...prev, `✔️ Parcela de ${item.nome_pessoa} (Venc: ${item.data_vencimento ? new Date(item.data_vencimento).toLocaleDateString() : 'N/D'}) migrada.`]);
      } catch (err: any) {
        setLogs(prev => [...prev, `❌ Falha ao migrar parcela de ${item.nome_pessoa}: ${err.message}`]);
      }

      setProgress(percent);
      await new Promise(r => setTimeout(r, 45));
    }

    setMigrationStatus('success');
    setLogs(prev => [...prev, `\n🎉 Processo concluído! Sucesso: ${successCount}/${bubbleMensalistaParcelas.length}`]);
    fetchSupabaseMensalistaParcelas();
  };

  // Fetch all Metas from Bubble
  const fetchBubbleMetas = async () => {
    setLoadingBubbleMetas(true);
    try {
      let allRecords: any[] = [];
      let cursor = 0;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`${BUBBLE_METAS_URL}?cursor=${cursor}`, {
          headers: { Authorization: `Bearer ${BUBBLE_TOKEN}` }
        });
        if (!res.ok) throw new Error('Falha ao buscar Metas do Bubble');
        const json = await res.json();
        const records = json.response.results || [];
        allRecords = allRecords.concat(records);

        const count = json.response.count || 0;
        const remaining = json.response.remaining || 0;
        if (remaining > 0) {
          cursor += count;
        } else {
          hasMore = false;
        }
      }

      // Map Bubble structure to our clean schema
      const mapped: Meta[] = allRecords.map((item: any) => ({
        id: item._id,
        transacao: item.transacao || null,
        valor: item.valor || 0,
        data_meta: item.dataMeta || null,
        mes_ano: item.mesAno || null,
        created_at: item['Created Date'] || null,
        updated_at: item['Modified Date'] || null,
        created_by: item['Created By'] || null,
        slug: item.Slug || null,
        raw: item
      }));

      setBubbleMetas(mapped);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao carregar metas do Bubble.io: ' + error.message);
    } finally {
      setLoadingBubbleMetas(false);
    }
  };

  // Fetch all Metas from Supabase
  const fetchSupabaseMetas = async () => {
    setLoadingSupabaseMetas(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/metas?select=*&order=data_meta.asc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (!res.ok) throw new Error('Falha ao buscar metas do Supabase');
      const json = await res.json();
      setSupabaseMetas(json || []);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingSupabaseMetas(false);
    }
  };

  // Start the Metas Migration Process
  const handleStartMetasMigration = async () => {
    if (bubbleMetas.length === 0) {
      alert('Carregue os dados de metas do Bubble.io primeiro!');
      return;
    }

    setIsModalOpen(true);
    setMigrationStatus('running');
    setProgress(0);
    setMigratedCount(0);
    setTotalToMigrate(bubbleMetas.length);
    setLogs(['Iniciando migração de metas...', `Total de registros a migrar: ${bubbleMetas.length}`]);

    let successCount = 0;

    for (let i = 0; i < bubbleMetas.length; i++) {
      const item = bubbleMetas[i];
      const percent = Math.round(((i + 1) / bubbleMetas.length) * 100);

      setLogs(prev => [...prev, `[${i + 1}/${bubbleMetas.length}] Enviando meta: ${item.mes_ano || 'Sem data'} (${item.transacao || 'Sem transacao'})...`]);

      try {
        const rec = item.raw || {};

        const fieldsToSave = {
          id: rec._id,
          transacao: rec.transacao || null,
          valor: rec.valor || 0,
          data_meta: rec.dataMeta || null,
          mes_ano: rec.mesAno || null,
          created_at: rec['Created Date'] || null,
          updated_at: rec['Modified Date'] || null,
          created_by: rec['Created By'] || null,
          slug: rec.Slug || null
        };

        // Post to Supabase REST API (performing UPSERT)
        const subRes = await fetch(`${SUPABASE_URL}/rest/v1/metas?on_conflict=id`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(fieldsToSave)
        });

        if (!subRes.ok) {
          const errBody = await subRes.text();
          throw new Error(`Código ${subRes.status}: ${subRes.statusText} - ${errBody}`);
        }

        successCount++;
        setMigratedCount(successCount);
        setLogs(prev => [...prev, `✔️ Meta ${item.mes_ano || ''} (${item.transacao || ''}) migrada com sucesso.`]);
      } catch (err: any) {
        setLogs(prev => [...prev, `❌ Falha ao migrar meta ${item.mes_ano || ''}: ${err.message}`]);
      }

      setProgress(percent);
      await new Promise(r => setTimeout(r, 60));
    }

    setMigrationStatus('success');
    setLogs(prev => [...prev, `\n🎉 Processo concluído! Sucesso: ${successCount}/${bubbleMetas.length}`]);
    fetchSupabaseMetas();
  };

  // Fetch all Despesas from Bubble
  const fetchBubbleDespesas = async () => {
    setLoadingBubbleDespesas(true);
    try {
      let allRecords: any[] = [];
      let cursor = 0;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`${BUBBLE_DESPESAS_URL}?cursor=${cursor}`, {
          headers: { Authorization: `Bearer ${BUBBLE_TOKEN}` }
        });
        if (!res.ok) throw new Error('Falha ao buscar Despesas do Bubble');
        const json = await res.json();
        const records = json.response.results || [];
        allRecords = allRecords.concat(records);

        const count = json.response.count || 0;
        const remaining = json.response.remaining || 0;
        if (remaining > 0) {
          cursor += count;
        } else {
          hasMore = false;
        }
      }

      // Map Bubble structure to our clean schema
      const mapped: Despesa[] = allRecords.map((item: any) => ({
        id: item._id,
        centro_custo_id: item.CentroCusto || null,
        data_despesa: item.dataDespesa || null,
        descricao_despesa: item.descricao || item.nomeCentroCustos || 'Sem descrição',
        descricao_forma_pagamento: item.descricaoFormaPagamento || 'N/A',
        forma_pagamento_id: item.FormaPagamento || null,
        nome_centro_custos: item.nomeCentroCustos || null,
        valor: item.valor || 0,
        valor_provisao: item.valorProvisao || 0,
        created_at: item['Created Date'] || null,
        updated_at: item['Modified Date'] || null,
        created_by: item['Created By'] || null,
        slug: item.Slug || null,
        raw: item
      }));

      setBubbleDespesas(mapped);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao carregar despesas do Bubble.io: ' + error.message);
    } finally {
      setLoadingBubbleDespesas(false);
    }
  };

  // Fetch all Despesas from Supabase
  const fetchSupabaseDespesas = async () => {
    setLoadingSupabaseDespesas(true);
    try {
      let allRecords: any[] = [];
      let offset = 0;
      let hasMore = true;
      const limit = 1000;

      while (hasMore) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/despesas?select=*&order=data_despesa.asc&limit=${limit}&offset=${offset}`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`
          }
        });
        if (!res.ok) throw new Error('Falha ao buscar despesas do Supabase');
        const json = await res.json();
        const records = json || [];
        allRecords = allRecords.concat(records);

        if (records.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }
      setSupabaseDespesas(allRecords);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingSupabaseDespesas(false);
    }
  };

  // Start the Despesas Migration Process
  const handleStartDespesasMigration = async () => {
    if (bubbleDespesas.length === 0) {
      alert('Carregue os dados de despesas do Bubble.io primeiro!');
      return;
    }

    setIsModalOpen(true);
    setMigrationStatus('running');
    setProgress(0);
    setMigratedCount(0);
    setTotalToMigrate(bubbleDespesas.length);
    setLogs(['Iniciando migração de despesas...', `Total de registros a migrar: ${bubbleDespesas.length}`]);

    let successCount = 0;

    for (let i = 0; i < bubbleDespesas.length; i++) {
      const item = bubbleDespesas[i];
      const percent = Math.round(((i + 1) / bubbleDespesas.length) * 100);

      setLogs(prev => [...prev, `[${i + 1}/${bubbleDespesas.length}] Enviando despesa: ${item.nome_centro_custos || 'Sem Centro'} (${item.valor ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor) : 'Sem valor'})...`]);

      try {
        const rec = item.raw || {};

        const fieldsToSave = {
          id: rec._id,
          centro_custo_id: rec.CentroCusto || null,
          data_despesa: rec.dataDespesa || null,
          descricao_despesa: rec.descricao || rec.nomeCentroCustos || 'Sem descrição',
          descricao_forma_pagamento: rec.descricaoFormaPagamento || null,
          forma_pagamento_id: rec.FormaPagamento || null,
          nome_centro_custos: rec.nomeCentroCustos || null,
          valor: rec.valor || 0,
          valor_provisao: rec.valorProvisao || 0,
          created_at: rec['Created Date'] || null,
          updated_at: rec['Modified Date'] || null,
          created_by: rec['Created By'] || null,
          slug: rec.Slug || null
        };

        // Post to Supabase REST API (performing UPSERT)
        const subRes = await fetch(`${SUPABASE_URL}/rest/v1/despesas?on_conflict=id`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(fieldsToSave)
        });

        if (!subRes.ok) {
          const errBody = await subRes.text();
          throw new Error(`Código ${subRes.status}: ${subRes.statusText} - ${errBody}`);
        }

        successCount++;
        setMigratedCount(successCount);
        setLogs(prev => [...prev, `✔️ Despesa ${item.nome_centro_custos || ''} (${item.valor || 0}) migrada com sucesso.`]);
      } catch (err: any) {
        setLogs(prev => [...prev, `❌ Falha ao migrar despesa ${item.nome_centro_custos || ''}: ${err.message}`]);
      }

      setProgress(percent);
      await new Promise(r => setTimeout(r, 60));
    }

    setMigrationStatus('success');
    setLogs(prev => [...prev, `\n🎉 Processo concluído! Sucesso: ${successCount}/${bubbleDespesas.length}`]);
    fetchSupabaseDespesas();
  };

  // Fetch all Entradas from Bubble
  const fetchBubbleEntradas = async () => {
    setLoadingBubbleEntradas(true);
    try {
      let allRecords: any[] = [];
      let cursor = 0;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`${BUBBLE_ENTRADAS_URL}?cursor=${cursor}`, {
          headers: { Authorization: `Bearer ${BUBBLE_TOKEN}` }
        });
        if (!res.ok) throw new Error('Falha ao buscar Entradas do Bubble');
        const json = await res.json();
        const records = json.response.results || [];
        allRecords = allRecords.concat(records);

        const count = json.response.count || 0;
        const remaining = json.response.remaining || 0;
        if (remaining > 0) {
          cursor += count;
        } else {
          hasMore = false;
        }
      }

      // Map Bubble structure to our clean schema
      const mapped: Entrada[] = allRecords.map((item: any) => ({
        id: item._id,
        centro_custo_id: item.CentroCusto || null,
        data_entrada: item.dataEntrada || null,
        descricao_entrada: item.descricaoEntrada || null,
        descricao_forma_pagamento: item.descricaoFormaPagamento || null,
        forma_pagamento_id: item.FormaPagamento || null,
        nome_centro_custo: item.nomeCentroCusto || null,
        nome_pessoa: item.nomePessoa || null,
        ordem_servico_id: item.OrdemServico || null,
        pessoa_id: item.Pessoa || null,
        placa_veiculo: item.placaVeiculo || null,
        valor: item.valor || 0,
        veiculo_id: item.Veiculo || null,
        created_at: item['Created Date'] || null,
        updated_at: item['Modified Date'] || null,
        created_by: item['Created By'] || null,
        slug: item.Slug || null,
        raw: item
      }));

      setBubbleEntradas(mapped);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao carregar entradas do Bubble.io: ' + error.message);
    } finally {
      setLoadingBubbleEntradas(false);
    }
  };

  // Fetch all Entradas from Supabase
  const fetchSupabaseEntradas = async () => {
    setLoadingSupabaseEntradas(true);
    try {
      let allRecords: any[] = [];
      let offset = 0;
      let hasMore = true;
      const limit = 1000;

      while (hasMore) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/entradas?select=*&order=data_entrada.desc&limit=${limit}&offset=${offset}`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`
          }
        });
        if (!res.ok) throw new Error('Falha ao buscar entradas do Supabase');
        const json = await res.json();
        const records = json || [];
        allRecords = allRecords.concat(records);

        if (records.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }
      setSupabaseEntradas(allRecords);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingSupabaseEntradas(false);
    }
  };

  // Funções CRUD para gerenciamento de Despesas/Custos
  const handleOpenCreateDespesa = () => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    setFormDataDespesa(todayStr);
    setFormDescricaoDespesa('');
    setFormValorDespesa('');
    setFormValorProvisaoDespesa('');
    setFormCentroCustoIdDespesa('');
    setFormFormaPagamentoIdDespesa('');
    setFormDespesaError(null);
    setSelectedDespesa(null);
    setDespesaFormMode('create');
  };

  const handleOpenEditDespesa = (despesa: Despesa) => {
    setSelectedDespesa(despesa);
    setFormDataDespesa(despesa.data_despesa ? despesa.data_despesa.split('T')[0] : '');
    setFormDescricaoDespesa(despesa.descricao_despesa || '');
    const formattedValor = despesa.valor !== undefined
      ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(despesa.valor)
      : '';
    const formattedProvisao = despesa.valor_provisao !== undefined
      ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(despesa.valor_provisao)
      : '';
    setFormValorDespesa(formattedValor);
    setFormValorProvisaoDespesa(formattedProvisao);
    setFormCentroCustoIdDespesa(despesa.centro_custo_id || '');
    setFormFormaPagamentoIdDespesa(despesa.forma_pagamento_id || '');
    setFormDespesaError(null);
    setDespesaFormMode('edit');
  };

  const handleSaveDespesa = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormDespesaSubmitting(true);
    setFormDespesaError(null);

    try {
      const valorNum = parseFloat(formValorDespesa.replace(/\./g, '').replace(',', '.'));
      if (isNaN(valorNum)) {
        throw new Error('Por favor, informe um valor numérico válido.');
      }
      
      let provisaoNum = 0;
      if (formValorProvisaoDespesa) {
        provisaoNum = parseFloat(formValorProvisaoDespesa.replace(/\./g, '').replace(',', '.'));
        if (isNaN(provisaoNum)) {
          throw new Error('Por favor, informe um valor de provisão válido.');
        }
      }

      const cc = supabaseCentroCusto.find(c => c.id === formCentroCustoIdDespesa);
      const fp = supabaseFormaPagamento.find(f => f.id === formFormaPagamentoIdDespesa);

      const payload: any = {
        data_despesa: formDataDespesa ? `${formDataDespesa}T12:00:00` : null,
        descricao_despesa: formDescricaoDespesa || null,
        valor: valorNum,
        valor_provisao: provisaoNum,
        centro_custo_id: formCentroCustoIdDespesa || null,
        nome_centro_custos: cc ? (cc.nome_centro_custo || cc.descricao) : null,
        forma_pagamento_id: formFormaPagamentoIdDespesa || null,
        descricao_forma_pagamento: fp ? fp.descricao : null,
        updated_at: new Date().toISOString()
      };

      if (despesaFormMode === 'create') {
        payload.id = crypto.randomUUID();
        payload.created_at = new Date().toISOString();
        payload.created_by = session?.user?.id || null;

        const { error } = await supabase
          .from('despesas')
          .insert([payload]);

        if (error) throw error;
      } else if (despesaFormMode === 'edit' && selectedDespesa) {
        const { error } = await supabase
          .from('despesas')
          .update(payload)
          .eq('id', selectedDespesa.id);

        if (error) throw error;
      }

      await fetchSupabaseDespesas();
      setDespesaFormMode('list');
      setSelectedDespesa(null);
    } catch (err: any) {
      console.error(err);
      setFormDespesaError(err.message || 'Erro ao salvar a despesa.');
    } finally {
      setFormDespesaSubmitting(false);
    }
  };

  const handleDeleteDespesa = async () => {
    if (!isExcluindoDespesa) return;
    setIsDeletingDespesa(true);

    try {
      const { error } = await supabase
        .from('despesas')
        .delete()
        .eq('id', isExcluindoDespesa.id);

      if (error) throw error;

      await fetchSupabaseDespesas();
      setIsExcluindoDespesa(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao excluir a despesa.');
    } finally {
      setIsDeletingDespesa(false);
    }
  };

  // Funções CRUD para gerenciamento de Mensalistas
  const handleOpenCreateMensalista = () => {
    setFormAtivoMensalista(true);
    setFormCentroCustoIdMensalista('');
    setFormDiaVencimentoMensalista('');
    setFormMarcaModeloMensalista('');
    setFormNomePessoaMensalista('');
    setFormObservacaoMensalista('');
    setFormPlacaMensalista('');
    setFormPlanoMensalista('Mensal VIP');
    setFormValorOriginalMensalista('');
    setFormVeiculoIdMensalista('');
    setFormMensalistaError(null);
    setSelectedMensalista(null);
    setMensalistaFormMode('create');
  };

  const handleOpenEditMensalista = (mensalista: Mensalista) => {
    setSelectedMensalista(mensalista);
    setFormAtivoMensalista(mensalista.ativo ?? true);
    setFormCentroCustoIdMensalista(mensalista.centro_custo_id || '');
    setFormDiaVencimentoMensalista(mensalista.dia_vencimento !== undefined ? String(mensalista.dia_vencimento) : '');
    setFormMarcaModeloMensalista(mensalista.marca_modelo || '');
    setFormNomePessoaMensalista(mensalista.nome_pessoa || '');
    setFormObservacaoMensalista(mensalista.observacao || '');
    setFormPlacaMensalista(mensalista.placa || '');
    setFormPlanoMensalista(mensalista.plano || 'Mensal VIP');
    const formattedValor = mensalista.valor_original !== undefined
      ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(mensalista.valor_original)
      : '';
    setFormValorOriginalMensalista(formattedValor);
    setFormVeiculoIdMensalista(mensalista.veiculo_id || '');
    setFormMensalistaError(null);
    setMensalistaFormMode('edit');
  };

  const handleSaveMensalista = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMensalistaSubmitting(true);
    setFormMensalistaError(null);

    try {
      const valorNum = parseFloat(formValorOriginalMensalista.replace(/\./g, '').replace(',', '.'));
      if (isNaN(valorNum)) {
        throw new Error('Por favor, informe um valor de mensalidade válido.');
      }
      
      const diaVencNum = parseInt(formDiaVencimentoMensalista);
      if (isNaN(diaVencNum) || diaVencNum < 1 || diaVencNum > 31) {
        throw new Error('Por favor, informe um dia de vencimento válido (1 a 31).');
      }

      const cc = supabaseCentroCusto.find(c => c.id === formCentroCustoIdMensalista);
      
      const payload: any = {
        ativo: formAtivoMensalista,
        centro_custo_id: formCentroCustoIdMensalista || null,
        dia_vencimento: diaVencNum,
        marca_modelo: formMarcaModeloMensalista || null,
        nome_pessoa: formNomePessoaMensalista || 'Sem nome',
        observacao: formObservacaoMensalista || null,
        placa: formPlacaMensalista || null,
        plano: formPlanoMensalista || null,
        valor_original: valorNum,
        veiculo_id: formVeiculoIdMensalista || null,
        updated_at: new Date().toISOString()
      };

      if (mensalistaFormMode === 'create') {
        payload.id = crypto.randomUUID();
        payload.created_at = new Date().toISOString();
        payload.created_by = session?.user?.id || null;

        const { error } = await supabase
          .from('mensalistas')
          .insert([payload]);

        if (error) throw error;
      } else if (mensalistaFormMode === 'edit' && selectedMensalista) {
        const { error } = await supabase
          .from('mensalistas')
          .update(payload)
          .eq('id', selectedMensalista.id);

        if (error) throw error;
      }

      await fetchSupabaseMensalistas();
      setMensalistaFormMode('list');
      setSelectedMensalista(null);
    } catch (err: any) {
      console.error(err);
      setFormMensalistaError(err.message || 'Erro ao salvar o mensalista.');
    } finally {
      setFormMensalistaSubmitting(false);
    }
  };

  const handleDeleteMensalista = async () => {
    if (!isExcluindoMensalista) return;
    setIsDeletingMensalista(true);

    try {
      const { error } = await supabase
        .from('mensalistas')
        .delete()
        .eq('id', isExcluindoMensalista.id);

      if (error) throw error;

      await fetchSupabaseMensalistas();
      setIsExcluindoMensalista(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao excluir o mensalista.');
    } finally {
      setIsDeletingMensalista(false);
    }
  };

  const handleGenerateParcelas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMensalistaFinanceiro) return;
    setGenSubmitting(true);
    setGenError(null);

    try {
      const valorNum = parseFloat(genValorParcela.replace(/\./g, '').replace(',', '.'));
      if (isNaN(valorNum) || valorNum <= 0) {
        throw new Error('Por favor, informe um valor de parcela válido maior que zero.');
      }

      const qty = parseInt(String(genQtyParcelas));
      if (isNaN(qty) || qty < 1 || qty > 100) {
        throw new Error('Por favor, escolha uma quantidade de parcelas válida (entre 1 e 100).');
      }

      const diaVenc = parseInt(String(genDiaVencimento));
      if (isNaN(diaVenc) || diaVenc < 1 || diaVenc > 31) {
        throw new Error('Por favor, informe um dia de vencimento válido (1 a 31).');
      }

      if (!genMesAnoInicio) {
        throw new Error('Por favor, selecione o mês/ano de início.');
      }

      // Parse mes inicial (formato YYYY-MM)
      const [startYearStr, startMonthStr] = genMesAnoInicio.split('-');
      let currentYear = parseInt(startYearStr);
      let currentMonth = parseInt(startMonthStr) - 1; // 0-indexed in JS Date

      const newParcelas: any[] = [];
      const nowStr = new Date().toISOString();

      for (let i = 0; i < qty; i++) {
        // Obter a data de vencimento correspondente para o mês i
        const vencDate = new Date(currentYear, currentMonth, diaVenc, 12, 0, 0);
        
        // Se a data pulou de mês por causa do dia (ex: dia 31 em fevereiro), limitamos para o último dia do mês correto
        if (vencDate.getMonth() !== currentMonth) {
          const lastDay = new Date(currentYear, currentMonth + 1, 0, 12, 0, 0);
          vencDate.setDate(lastDay.getDate());
        }

        const dateStr = vencDate.toISOString().split('T')[0];

        newParcelas.push({
          id: crypto.randomUUID(),
          mensalista_id: activeMensalistaFinanceiro.id,
          nome_pessoa: activeMensalistaFinanceiro.nome_pessoa || 'Sem nome',
          valor_original: valorNum,
          valor_pago: 0,
          data_vencimento: `${dateStr}T12:00:00`,
          data_pagamento: null,
          created_at: nowStr,
          updated_at: nowStr,
          created_by: session?.user?.id || null,
          slug: activeMensalistaFinanceiro.slug || null
        });

        // Avançar para o próximo mês
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
      }

      // Enviar em massa para a tabela mensalistaparcelas no Supabase
      const { error } = await supabase
        .from('mensalistaparcelas')
        .insert(newParcelas);

      if (error) throw error;

      // Recarregar parcelas
      await fetchSupabaseMensalistaParcelas();
      setIsGeneratingParcelas(false);
      setGenValorParcela('');
    } catch (err: any) {
      console.error(err);
      setGenError(err.message || 'Erro ao gerar as parcelas.');
    } finally {
      setGenSubmitting(false);
    }
  };

  const handlePayParcela = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPayingParcela || !activeMensalistaFinanceiro) return;
    setPaySubmitting(true);
    setPayError(null);

    try {
      const valorPagoNum = parseFloat(payValorPago.replace(/\./g, '').replace(',', '.'));
      if (isNaN(valorPagoNum) || valorPagoNum < 0) {
        throw new Error('Por favor, informe um valor de pagamento válido.');
      }

      if (!payDataPagamento) {
        throw new Error('Por favor, selecione a data do pagamento.');
      }

      if (!payCentroCustoId) {
        throw new Error('Por favor, selecione o centro de custo financeiro.');
      }

      if (!payFormaPagamentoId) {
        throw new Error('Por favor, selecione a forma de pagamento.');
      }

      const fp = supabaseFormaPagamento.find(f => f.id === payFormaPagamentoId);
      const cc = supabaseCentroCusto.find(c => c.id === payCentroCustoId);

      // 1. Atualizar a parcela correspondente
      const { error: updateError } = await supabase
        .from('mensalistaparcelas')
        .update({
          valor_pago: valorPagoNum,
          data_pagamento: `${payDataPagamento}T12:00:00`,
          updated_at: new Date().toISOString()
        })
        .eq('id', isPayingParcela.id);

      if (updateError) throw updateError;

      // 2. Inserir a nova Entrada (receita) de forma automática
      const entradaPayload: any = {
        id: crypto.randomUUID(),
        centro_custo_id: payCentroCustoId,
        nome_centro_custo: cc ? (cc.nome_centro_custo || cc.descricao) : 'Mensalidades / Recorrentes',
        data_entrada: `${payDataPagamento}T12:00:00`,
        descricao_entrada: `Mensalidade Baixa - ${activeMensalistaFinanceiro.nome_pessoa || 'Mensalista'}`,
        valor: valorPagoNum,
        forma_pagamento_id: payFormaPagamentoId,
        descricao_forma_pagamento: fp ? fp.descricao : 'PIX',
        pessoa_id: null,
        nome_pessoa: activeMensalistaFinanceiro.nome_pessoa || null,
        veiculo_id: activeMensalistaFinanceiro.veiculo_id || null,
        placa_veiculo: activeMensalistaFinanceiro.placa || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: session?.user?.id || null,
        slug: `parcela_${isPayingParcela.id}`
      };

      const { error: insertError } = await supabase
        .from('entradas')
        .insert([entradaPayload]);

      if (insertError) throw insertError;

      // 3. Recarregar parcelas e entradas
      await fetchSupabaseMensalistaParcelas();
      await fetchSupabaseEntradas();
      setIsPayingParcela(null);
    } catch (err: any) {
      console.error(err);
      setPayError(err.message || 'Erro ao realizar o pagamento da parcela.');
    } finally {
      setPaySubmitting(false);
    }
  };

  const handleRevertParcela = async () => {
    if (!isRevertingParcela || !activeMensalistaFinanceiro) return;
    setRevertSubmitting(true);
    setRevertError(null);

    try {
      // 1. Localizar o ID da Entrada a ser excluída
      let entradaIdToDelete = null;

      // Buscar pelo slug do vínculo exato
      const { data: bySlug, error: errSlug } = await supabase
        .from('entradas')
        .select('id')
        .eq('slug', `parcela_${isRevertingParcela.id}`)
        .limit(1);

      if (errSlug) throw errSlug;

      if (bySlug && bySlug.length > 0) {
        entradaIdToDelete = bySlug[0].id;
      } else {
        // Fallback: buscar por combinação de campos do registro legado
        const { data: byFallback, error: errFallback } = await supabase
          .from('entradas')
          .select('id')
          .eq('nome_pessoa', activeMensalistaFinanceiro.nome_pessoa)
          .eq('valor', isRevertingParcela.valor_pago || 0)
          .eq('placa_veiculo', activeMensalistaFinanceiro.placa || '')
          .limit(1);

        if (errFallback) throw errFallback;

        if (byFallback && byFallback.length > 0) {
          entradaIdToDelete = byFallback[0].id;
        }
      }

      // 2. Se a entrada foi localizada, excluir
      if (entradaIdToDelete) {
        const { error: deleteError } = await supabase
          .from('entradas')
          .delete()
          .eq('id', entradaIdToDelete);

        if (deleteError) throw deleteError;
      }

      // 3. Atualizar a parcela para "Pendente" no Supabase (data_pagamento = null, valor_pago = null)
      const { error: updateError } = await supabase
        .from('mensalistaparcelas')
        .update({
          valor_pago: null,
          data_pagamento: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', isRevertingParcela.id);

      if (updateError) throw updateError;

      // 4. Atualizar estados locais e recarregar
      await fetchSupabaseMensalistaParcelas();
      await fetchSupabaseEntradas();
      setIsRevertingParcela(null);
    } catch (err: any) {
      console.error(err);
      setRevertError(err.message || 'Erro ao realizar o estorno da parcela.');
    } finally {
      setRevertSubmitting(false);
    }
  };

  // Funções CRUD para gerenciamento de Entradas/Receitas
  const handleOpenCreateEntrada = () => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    setFormDataEntrada(todayStr);
    setFormDescricaoEntrada('');
    setFormValorEntrada('');
    setFormCentroCustoId('');
    setFormFormaPagamentoId('');
    setFormPessoaId('');
    setFormVeiculoId('');
    setFormPlacaVeiculo('');
    setFormEntradaError(null);
    setSelectedEntrada(null);
    setEntradaFormMode('create');
  };

  const handleOpenEditEntrada = (entrada: Entrada) => {
    setSelectedEntrada(entrada);
    setFormDataEntrada(entrada.data_entrada ? entrada.data_entrada.split('T')[0] : '');
    setFormDescricaoEntrada(entrada.descricao_entrada || '');
    const formattedValor = entrada.valor !== undefined
      ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(entrada.valor)
      : '';
    setFormValorEntrada(formattedValor);
    setFormCentroCustoId(entrada.centro_custo_id || '');
    setFormFormaPagamentoId(entrada.forma_pagamento_id || '');
    setFormPessoaId(entrada.pessoa_id || '');
    setFormVeiculoId(entrada.veiculo_id || '');
    setFormPlacaVeiculo(entrada.placa_veiculo || '');
    setFormEntradaError(null);
    setEntradaFormMode('edit');
  };

  const handleSaveEntrada = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormEntradaSubmitting(true);
    setFormEntradaError(null);

    try {
      const valorNum = parseFloat(formValorEntrada.replace(/\./g, '').replace(',', '.'));
      if (isNaN(valorNum)) {
        throw new Error('Por favor, informe um valor numérico válido.');
      }

      const cc = supabaseCentroCusto.find(c => c.id === formCentroCustoId);
      const fp = supabaseFormaPagamento.find(f => f.id === formFormaPagamentoId);
      const pes = supabaseData.find(p => p.id === formPessoaId);
      const vei = supabaseVehicles.find(v => v.id === formVeiculoId);

      const payload: any = {
        data_entrada: formDataEntrada ? `${formDataEntrada}T12:00:00` : null,
        descricao_entrada: formDescricaoEntrada || null,
        valor: valorNum,
        centro_custo_id: formCentroCustoId || null,
        nome_centro_custo: cc ? (cc.nome_centro_custo || cc.descricao) : null,
        forma_pagamento_id: formFormaPagamentoId || null,
        descricao_forma_pagamento: fp ? fp.descricao : null,
        pessoa_id: formPessoaId || null,
        nome_pessoa: pes ? pes.nome_pessoa : null,
        veiculo_id: formVeiculoId || null,
        placa_veiculo: formPlacaVeiculo || (vei ? vei.placa : null) || null,
        updated_at: new Date().toISOString()
      };

      if (entradaFormMode === 'create') {
        payload.id = crypto.randomUUID();
        payload.created_at = new Date().toISOString();
        payload.created_by = session?.user?.id || null;

        const { error } = await supabase
          .from('entradas')
          .insert([payload]);

        if (error) throw error;
      } else if (entradaFormMode === 'edit' && selectedEntrada) {
        const { error } = await supabase
          .from('entradas')
          .update(payload)
          .eq('id', selectedEntrada.id);

        if (error) throw error;
      }

      await fetchSupabaseEntradas();
      setEntradaFormMode('list');
      setSelectedEntrada(null);
    } catch (err: any) {
      console.error(err);
      setFormEntradaError(err.message || 'Erro ao salvar a entrada.');
    } finally {
      setFormEntradaSubmitting(false);
    }
  };

  const handleDeleteEntrada = async () => {
    if (!isExcluindoEntrada) return;
    setIsDeletingEntrada(true);

    try {
      const { error } = await supabase
        .from('entradas')
        .delete()
        .eq('id', isExcluindoEntrada.id);

      if (error) throw error;

      await fetchSupabaseEntradas();
      setIsExcluindoEntrada(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao excluir a entrada.');
    } finally {
      setIsDeletingEntrada(false);
    }
  };

  // Pessoas CRUD handler functions
  const handleOpenCreatePessoa = () => {
    setFormPessoaNome('');
    setFormPessoaTipo('Cliente');
    setFormPessoaCelular('');
    setFormPessoaCpf('');
    setFormPessoaCnpj('');
    setFormPessoaCidade('');
    setFormPessoaUf('');
    setFormPessoaAtivo(true);
    setFormPessoaError(null);
    setSelectedPessoa(null);
    setPessoaFormMode('create');
  };

  const handleOpenEditPessoa = (pessoa: Pessoa) => {
    setSelectedPessoa(pessoa);
    setFormPessoaNome(pessoa.nome_pessoa || '');
    setFormPessoaTipo(pessoa.tipo_pessoa || 'Cliente');
    setFormPessoaCelular(pessoa.celular_whatsapp || '');
    setFormPessoaCpf(pessoa.cpf || '');
    setFormPessoaCnpj(pessoa.cnpj || '');
    setFormPessoaCidade(pessoa.cidade || '');
    setFormPessoaUf(pessoa.uf || '');
    setFormPessoaAtivo(pessoa.ativo !== false);
    setFormPessoaError(null);
    setPessoaFormMode('edit');
  };

  const handleSavePessoa = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormPessoaSubmitting(true);
    setFormPessoaError(null);

    try {
      if (!formPessoaNome.trim()) {
        throw new Error('Por favor, informe o nome da pessoa.');
      }

      const payload: any = {
        nome_pessoa: formPessoaNome.trim(),
        tipo_pessoa: formPessoaTipo,
        celular_whatsapp: formPessoaCelular.trim() || null,
        cpf: formPessoaTipo !== 'Empresa' ? (formPessoaCpf.trim() || null) : null,
        cnpj: formPessoaTipo === 'Empresa' ? (formPessoaCnpj.trim() || null) : null,
        cidade: formPessoaCidade.trim() || null,
        uf: formPessoaUf.trim().toUpperCase() || null,
        ativo: formPessoaAtivo,
        updated_at: new Date().toISOString()
      };

      if (pessoaFormMode === 'create') {
        payload.id = crypto.randomUUID();
        payload.created_at = new Date().toISOString();
        payload.created_by = session?.user?.id || null;

        const { error } = await supabase
          .from('pessoas')
          .insert([payload]);

        if (error) throw error;
      } else if (pessoaFormMode === 'edit' && selectedPessoa) {
        const { error } = await supabase
          .from('pessoas')
          .update(payload)
          .eq('id', selectedPessoa.id);

        if (error) throw error;
      }

      await fetchSupabaseData();
      setPessoaFormMode('list');
      setSelectedPessoa(null);
    } catch (err: any) {
      console.error(err);
      setFormPessoaError(err.message || 'Erro ao salvar a pessoa.');
    } finally {
      setFormPessoaSubmitting(false);
    }
  };

  const handleDeletePessoa = async () => {
    if (!isExcluindoPessoa) return;
    setIsDeletingPessoa(true);

    try {
      const { error } = await supabase
        .from('pessoas')
        .delete()
        .eq('id', isExcluindoPessoa.id);

      if (error) throw error;

      await fetchSupabaseData();
      setIsExcluindoPessoa(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao excluir a pessoa.');
    } finally {
      setIsDeletingPessoa(false);
    }
  };

  // Veiculos CRUD Handlers
  const handleOpenCreateVeiculo = () => {
    setFormVeiculoPlaca('');
    setFormVeiculoMarcaModelo('');
    setFormVeiculoTipo('CARRETA');
    setFormVeiculoPessoaId('');
    setFormVeiculoMotorista('');
    setFormVeiculoAtivo(true);
    setFormVeiculoError(null);
    setSelectedVeiculo(null);
    setVeiculoFormMode('create');
  };

  const handleOpenEditVeiculo = (veiculo: Veiculo) => {
    setSelectedVeiculo(veiculo);
    setFormVeiculoPlaca(veiculo.placa || '');
    setFormVeiculoMarcaModelo(veiculo.marca_modelo || '');
    setFormVeiculoTipo(veiculo.tipo || 'CARRETA');
    setFormVeiculoPessoaId(veiculo.pessoa_id || '');
    
    if (veiculo.motorista) {
      if (Array.isArray(veiculo.motorista)) {
        setFormVeiculoMotorista(veiculo.motorista.join(', '));
      } else {
        setFormVeiculoMotorista(String(veiculo.motorista));
      }
    } else {
      setFormVeiculoMotorista('');
    }
    
    setFormVeiculoAtivo(veiculo.ativo !== false);
    setFormVeiculoError(null);
    setVeiculoFormMode('edit');
  };

  const handleSaveVeiculo = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormVeiculoSubmitting(true);
    setFormVeiculoError(null);

    try {
      if (!formVeiculoPlaca.trim()) {
        throw new Error('Por favor, informe a placa do veículo.');
      }
      if (!formVeiculoMarcaModelo.trim()) {
        throw new Error('Por favor, informe a marca/modelo do veículo.');
      }

      let proprietarioNome = '';
      if (formVeiculoPessoaId) {
        const found = supabaseData.find(p => p.id === formVeiculoPessoaId);
        if (found) {
          proprietarioNome = found.nome_pessoa || '';
        }
      }

      const motoristaList = formVeiculoMotorista
        .split(',')
        .map(m => m.trim())
        .filter(m => m.length > 0);

      const payload: any = {
        placa: formVeiculoPlaca.trim().toUpperCase(),
        marca_modelo: formVeiculoMarcaModelo.trim(),
        tipo: formVeiculoTipo,
        pessoa_id: formVeiculoPessoaId || null,
        pessoa_nome: proprietarioNome || null,
        motorista: motoristaList.length > 0 ? motoristaList : null,
        ativo: formVeiculoAtivo,
        updated_at: new Date().toISOString()
      };

      if (veiculoFormMode === 'create') {
        payload.id = crypto.randomUUID();
        payload.created_at = new Date().toISOString();
        payload.created_by = session?.user?.id || null;

        const { error } = await supabase
          .from('veiculos')
          .insert([payload]);

        if (error) throw error;
      } else if (veiculoFormMode === 'edit' && selectedVeiculo) {
        const { error } = await supabase
          .from('veiculos')
          .update(payload)
          .eq('id', selectedVeiculo.id);

        if (error) throw error;
      }

      await fetchSupabaseVehicles();
      setVeiculoFormMode('list');
      setSelectedVeiculo(null);
    } catch (err: any) {
      console.error(err);
      setFormVeiculoError(err.message || 'Erro ao salvar o veículo.');
    } finally {
      setFormVeiculoSubmitting(false);
    }
  };

  const handleDeleteVeiculo = async () => {
    if (!isExcluindoVeiculo) return;
    setIsDeletingVeiculo(true);

    try {
      const { error } = await supabase
        .from('veiculos')
        .delete()
        .eq('id', isExcluindoVeiculo.id);

      if (error) throw error;

      await fetchSupabaseVehicles();
      setIsExcluindoVeiculo(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao excluir o veículo.');
    } finally {
      setIsDeletingVeiculo(false);
    }
  };

  // Forma Pagamento CRUD Handlers
  const handleOpenCreateFormaPagamento = () => {
    setFormFormaPagamentoDescricao('');
    setFormFormaPagamentoTipoTransacao('PIX');
    setFormFormaPagamentoAtivo(true);
    setFormFormaPagamentoError(null);
    setSelectedFormaPagamento(null);
    setFormaPagamentoFormMode('create');
  };

  const handleOpenEditFormaPagamento = (fp: FormaPagamento) => {
    setSelectedFormaPagamento(fp);
    setFormFormaPagamentoDescricao(fp.descricao || '');
    setFormFormaPagamentoTipoTransacao(fp.tipo_transacao || 'PIX');
    setFormFormaPagamentoAtivo(fp.ativo !== false);
    setFormFormaPagamentoError(null);
    setFormaPagamentoFormMode('edit');
  };

  const handleSaveFormaPagamento = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormFormaPagamentoSubmitting(true);
    setFormFormaPagamentoError(null);

    try {
      if (!formFormaPagamentoDescricao.trim()) {
        throw new Error('Por favor, informe a descrição da forma de pagamento.');
      }
      if (!formFormaPagamentoTipoTransacao.trim()) {
        throw new Error('Por favor, informe o tipo de transação.');
      }

      const payload: any = {
        descricao: formFormaPagamentoDescricao.trim(),
        tipo_transacao: formFormaPagamentoTipoTransacao.trim().toUpperCase(),
        ativo: formFormaPagamentoAtivo,
        updated_at: new Date().toISOString()
      };

      if (formaPagamentoFormMode === 'create') {
        payload.id = crypto.randomUUID();
        payload.created_at = new Date().toISOString();
        payload.created_by = session?.user?.id || null;

        const { error } = await supabase
          .from('formapagamento')
          .insert([payload]);

        if (error) throw error;
      } else if (formaPagamentoFormMode === 'edit' && selectedFormaPagamento) {
        const { error } = await supabase
          .from('formapagamento')
          .update(payload)
          .eq('id', selectedFormaPagamento.id);

        if (error) throw error;
      }

      await fetchSupabaseFormaPagamento();
      setFormaPagamentoFormMode('list');
      setSelectedFormaPagamento(null);
    } catch (err: any) {
      console.error(err);
      setFormFormaPagamentoError(err.message || 'Erro ao salvar a forma de pagamento.');
    } finally {
      setFormFormaPagamentoSubmitting(false);
    }
  };

  const handleDeleteFormaPagamento = async () => {
    if (!isExcluindoFormaPagamento) return;
    setIsDeletingFormaPagamento(true);

    try {
      // Verificar se existem registros filhos (Entradas ou Despesas) vinculados a esta Forma de Pagamento
      const temDespesas = supabaseDespesas.some(d => d.forma_pagamento_id === isExcluindoFormaPagamento.id);
      const temEntradas = supabaseEntradas.some(e => e.forma_pagamento_id === isExcluindoFormaPagamento.id);

      if (temDespesas || temEntradas) {
        throw new Error('Não é possível excluir esta forma de pagamento pois existem registros de Entradas ou Despesas vinculados a ela.');
      }

      const { error } = await supabase
        .from('formapagamento')
        .delete()
        .eq('id', isExcluindoFormaPagamento.id);

      if (error) throw error;

      await fetchSupabaseFormaPagamento();
      setIsExcluindoFormaPagamento(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao excluir a forma de pagamento.');
      setIsExcluindoFormaPagamento(null);
    } finally {
      setIsDeletingFormaPagamento(false);
    }
  };

  // Centro Custo CRUD Handlers
  const handleOpenCreateCentroCusto = () => {
    setFormCentroCustoNome('');
    setFormCentroCustoDescricao('');
    setFormCentroCustoTipoMovimentacao('DESPESA');
    setFormCentroCustoTipoRecorrencia('Não Informado');
    setFormCentroCustoValorProvisao(0);
    setFormCentroCustoAtivo(true);
    setFormCentroCustoError(null);
    setSelectedCentroCusto(null);
    setCentroCustoFormMode('create');
  };

  const handleOpenEditCentroCusto = (cc: CentroCusto) => {
    setSelectedCentroCusto(cc);
    setFormCentroCustoNome(cc.nome_centro_custo || '');
    setFormCentroCustoDescricao(cc.descricao || '');
    setFormCentroCustoTipoMovimentacao(cc.tipo_movimentacao || 'DESPESA');
    setFormCentroCustoTipoRecorrencia(cc.tipo_recorrencia || 'Não Informado');
    setFormCentroCustoValorProvisao(cc.valor_provisao || 0);
    setFormCentroCustoAtivo(cc.ativo !== false);
    setFormCentroCustoError(null);
    setCentroCustoFormMode('edit');
  };

  const handleSaveCentroCusto = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormCentroCustoSubmitting(true);
    setFormCentroCustoError(null);

    try {
      if (!formCentroCustoNome.trim()) {
        throw new Error('Por favor, informe o nome do centro de custo.');
      }

      const payload: any = {
        nome_centro_custo: formCentroCustoNome.trim(),
        descricao: formCentroCustoDescricao.trim() || null,
        tipo_movimentacao: formCentroCustoTipoMovimentacao.toUpperCase(),
        tipo_recorrencia: formCentroCustoTipoRecorrencia,
        valor_provisao: Number(formCentroCustoValorProvisao) || 0,
        ativo: formCentroCustoAtivo,
        updated_at: new Date().toISOString()
      };

      if (centroCustoFormMode === 'create') {
        payload.id = crypto.randomUUID();
        payload.created_at = new Date().toISOString();
        payload.created_by = session?.user?.id || null;

        const { error } = await supabase
          .from('centrocusto')
          .insert([payload]);

        if (error) throw error;
      } else if (centroCustoFormMode === 'edit' && selectedCentroCusto) {
        const { error } = await supabase
          .from('centrocusto')
          .update(payload)
          .eq('id', selectedCentroCusto.id);

        if (error) throw error;
      }

      await fetchSupabaseCentroCusto();
      setCentroCustoFormMode('list');
      setSelectedCentroCusto(null);
    } catch (err: any) {
      console.error(err);
      setFormCentroCustoError(err.message || 'Erro ao salvar o centro de custo.');
    } finally {
      setFormCentroCustoSubmitting(false);
    }
  };

  const handleDeleteCentroCusto = async () => {
    if (!isExcluindoCentroCusto) return;
    setIsDeletingCentroCusto(true);

    try {
      // 1. Verificação local no cache em memória para resposta instantânea
      const temDespesasLocal = supabaseDespesas.some(d => d.centro_custo_id === isExcluindoCentroCusto.id);
      const temEntradasLocal = supabaseEntradas.some(e => e.centro_custo_id === isExcluindoCentroCusto.id);

      if (temDespesasLocal || temEntradasLocal) {
        throw new Error('Não é possível excluir este centro de custo pois existem registros de Entradas ou Despesas vinculados a ele.');
      }

      // 2. Verificação direta em tempo real no banco de dados (Supabase REST API) para segurança robusta
      const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`
      };

      const [resDespesas, resEntradas] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/despesas?centro_custo_id=eq.${isExcluindoCentroCusto.id}&select=id`, { headers }),
        fetch(`${SUPABASE_URL}/rest/v1/entradas?centro_custo_id=eq.${isExcluindoCentroCusto.id}&select=id`, { headers })
      ]);

      if (resDespesas.ok && resEntradas.ok) {
        const despesasDb = await resDespesas.json();
        const entradasDb = await resEntradas.json();
        if ((despesasDb && despesasDb.length > 0) || (entradasDb && entradasDb.length > 0)) {
          throw new Error('Não é possível excluir este centro de custo pois existem registros de Entradas ou Despesas vinculados a ele no banco de dados.');
        }
      }

      const { error } = await supabase
        .from('centrocusto')
        .delete()
        .eq('id', isExcluindoCentroCusto.id);

      if (error) throw error;

      await fetchSupabaseCentroCusto();
      setIsExcluindoCentroCusto(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao excluir o centro de custo.');
      setIsExcluindoCentroCusto(null);
    } finally {
      setIsDeletingCentroCusto(false);
    }
  };


  // Start the Entradas Migration Process
  const handleStartEntradasMigration = async () => {
    if (bubbleEntradas.length === 0) {
      alert('Carregue os dados de entradas do Bubble.io primeiro!');
      return;
    }

    setIsModalOpen(true);
    setMigrationStatus('running');
    setProgress(0);
    setMigratedCount(0);
    setTotalToMigrate(bubbleEntradas.length);
    setLogs(['Iniciando migração de entradas...', `Total de registros a migrar: ${bubbleEntradas.length}`]);

    let successCount = 0;

    for (let i = 0; i < bubbleEntradas.length; i++) {
      const item = bubbleEntradas[i];
      const percent = Math.round(((i + 1) / bubbleEntradas.length) * 100);

      setLogs(prev => [...prev, `[${i + 1}/${bubbleEntradas.length}] Enviando entrada: ${item.descricao_entrada || 'Sem descrição'} (${item.valor ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor) : 'Sem valor'})...`]);

      try {
        const rec = item.raw || {};

        const fieldsToSave = {
          id: rec._id,
          centro_custo_id: rec.CentroCusto || null,
          data_entrada: rec.dataEntrada || null,
          descricao_entrada: rec.descricaoEntrada || null,
          descricao_forma_pagamento: rec.descricaoFormaPagamento || null,
          forma_pagamento_id: rec.FormaPagamento || null,
          nome_centro_custo: rec.nomeCentroCusto || null,
          nome_pessoa: rec.nomePessoa || null,
          ordem_servico_id: rec.OrdemServico || null,
          pessoa_id: rec.Pessoa || null,
          placa_veiculo: rec.placaVeiculo || null,
          valor: rec.valor || 0,
          veiculo_id: rec.Veiculo || null,
          created_at: rec['Created Date'] || null,
          updated_at: rec['Modified Date'] || null,
          created_by: rec['Created By'] || null,
          slug: rec.Slug || null
        };

        // Post to Supabase REST API (performing UPSERT)
        const subRes = await fetch(`${SUPABASE_URL}/rest/v1/entradas?on_conflict=id`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(fieldsToSave)
        });

        if (!subRes.ok) {
          const errBody = await subRes.text();
          throw new Error(`Código ${subRes.status}: ${subRes.statusText} - ${errBody}`);
        }

        successCount++;
        setMigratedCount(successCount);
        setLogs(prev => [...prev, `✔️ Entrada ${item.descricao_entrada || ''} (${item.nome_pessoa || ''}) migrada.`]);
      } catch (err: any) {
        setLogs(prev => [...prev, `❌ Falha ao migrar entrada ${item.descricao_entrada || ''}: ${err.message}`]);
      }

      setProgress(percent);
      await new Promise(r => setTimeout(r, 60));
    }

    setMigrationStatus('success');
    setLogs(prev => [...prev, `\n🎉 Processo concluído! Sucesso: ${successCount}/${bubbleEntradas.length}`]);
    fetchSupabaseEntradas();
  };

  // On mount, load all data only if session is active
  useEffect(() => {
    if (session) {
      fetchBubbleData();
      fetchSupabaseData();
      fetchBubbleVehicles();
      fetchSupabaseVehicles();
      fetchBubbleCentroCusto();
      fetchSupabaseCentroCusto();
      fetchBubbleFormaPagamento();
      fetchSupabaseFormaPagamento();
      fetchBubbleMensalistas();
      fetchSupabaseMensalistas();
      fetchBubbleMensalistaParcelas();
      fetchSupabaseMensalistaParcelas();
      fetchBubbleMetas();
      fetchSupabaseMetas();
      fetchBubbleDespesas();
      fetchSupabaseDespesas();
      fetchBubbleEntradas();
      fetchSupabaseEntradas();
    }
  }, [session]);

  // Filter local rows (Pessoas)
  const filteredBubble = bubbleData.filter(item =>
    (item.nome_pessoa || '').toLowerCase().includes(searchBubble.toLowerCase()) ||
    (item.cpf || '').includes(searchBubble) ||
    (item.cnpj || '').includes(searchBubble)
  );

  const filteredSupabase = supabaseData.filter(item =>
    (item.nome_pessoa || '').toLowerCase().includes(searchSupabase.toLowerCase()) ||
    (item.cpf || '').includes(searchSupabase) ||
    (item.cnpj || '').includes(searchSupabase) ||
    (item.celular_whatsapp || '').includes(searchSupabase)
  );

  // Filter local rows (Veiculos)
  const filteredBubbleVehicles = bubbleVehicles.filter(item =>
    (item.placa || '').toLowerCase().includes(searchBubbleVehicles.toLowerCase()) ||
    (item.marca_modelo || '').toLowerCase().includes(searchBubbleVehicles.toLowerCase()) ||
    (item.pessoa_nome || '').toLowerCase().includes(searchBubbleVehicles.toLowerCase())
  );

  const filteredSupabaseVehicles = supabaseVehicles.filter(item =>
    (item.placa || '').toLowerCase().includes(searchSupabaseVehicles.toLowerCase()) ||
    (item.marca_modelo || '').toLowerCase().includes(searchSupabaseVehicles.toLowerCase()) ||
    (item.pessoa_nome || '').toLowerCase().includes(searchSupabaseVehicles.toLowerCase())
  );

  // Filter local rows (Centro Custo)
  const filteredBubbleCentroCusto = bubbleCentroCusto.filter(item =>
    (item.nome_centro_custo || '').toLowerCase().includes(searchBubbleCentroCusto.toLowerCase()) ||
    (item.descricao || '').toLowerCase().includes(searchBubbleCentroCusto.toLowerCase()) ||
    (item.tipo_recorrencia || '').toLowerCase().includes(searchBubbleCentroCusto.toLowerCase())
  );

  const filteredSupabaseCentroCusto = supabaseCentroCusto.filter(item =>
    (item.nome_centro_custo || '').toLowerCase().includes(searchSupabaseCentroCusto.toLowerCase()) ||
    (item.descricao || '').toLowerCase().includes(searchSupabaseCentroCusto.toLowerCase()) ||
    (item.tipo_recorrencia || '').toLowerCase().includes(searchSupabaseCentroCusto.toLowerCase())
  );

  // Filter local rows (Forma Pagamento)
  const filteredBubbleFormaPagamento = bubbleFormaPagamento.filter(item =>
    (item.descricao || '').toLowerCase().includes(searchBubbleFormaPagamento.toLowerCase()) ||
    (item.tipo_transacao || '').toLowerCase().includes(searchBubbleFormaPagamento.toLowerCase())
  );

  const filteredSupabaseFormaPagamento = supabaseFormaPagamento.filter(item =>
    (item.descricao || '').toLowerCase().includes(searchSupabaseFormaPagamento.toLowerCase()) ||
    (item.tipo_transacao || '').toLowerCase().includes(searchSupabaseFormaPagamento.toLowerCase())
  );

  // Filter local rows (Mensalistas)
  const filteredBubbleMensalistas = bubbleMensalistas.filter(item =>
    (item.nome_pessoa || '').toLowerCase().includes(searchBubbleMensalistas.toLowerCase()) ||
    (item.placa || '').toLowerCase().includes(searchBubbleMensalistas.toLowerCase()) ||
    (item.marca_modelo || '').toLowerCase().includes(searchBubbleMensalistas.toLowerCase()) ||
    (item.plano || '').toLowerCase().includes(searchBubbleMensalistas.toLowerCase())
  );

  const filteredSupabaseMensalistas = supabaseMensalistas.filter(item => {
    const matchesSearch = (item.nome_pessoa || '').toLowerCase().includes(searchSupabaseMensalistas.toLowerCase()) ||
      (item.placa || '').toLowerCase().includes(searchSupabaseMensalistas.toLowerCase()) ||
      (item.marca_modelo || '').toLowerCase().includes(searchSupabaseMensalistas.toLowerCase()) ||
      (item.plano || '').toLowerCase().includes(searchSupabaseMensalistas.toLowerCase());

    if (!matchesSearch) return false;
    if (periodoInicioMensalistas || periodoFimMensalistas) {
      const itemDateStr = item.created_at ? item.created_at.split('T')[0] : '';
      if (!itemDateStr) return false;
      if (periodoInicioMensalistas && itemDateStr < periodoInicioMensalistas) return false;
      if (periodoFimMensalistas && itemDateStr > periodoFimMensalistas) return false;
    }
    return true;
  });

  // Filter local rows (Mensalistas Parcelas)
  const filteredBubbleMensalistaParcelas = bubbleMensalistaParcelas.filter(item =>
    (item.nome_pessoa || '').toLowerCase().includes(searchBubbleMensalistaParcelas.toLowerCase()) ||
    (item.id || '').toLowerCase().includes(searchBubbleMensalistaParcelas.toLowerCase()) ||
    (item.mensalista_id || '').toLowerCase().includes(searchBubbleMensalistaParcelas.toLowerCase())
  );

  const filteredSupabaseMensalistaParcelas = supabaseMensalistaParcelas.filter(item =>
    (item.nome_pessoa || '').toLowerCase().includes(searchSupabaseMensalistaParcelas.toLowerCase()) ||
    (item.id || '').toLowerCase().includes(searchSupabaseMensalistaParcelas.toLowerCase()) ||
    (item.mensalista_id || '').toLowerCase().includes(searchSupabaseMensalistaParcelas.toLowerCase())
  );

  // Filter local rows (Metas)
  const filteredBubbleMetas = bubbleMetas.filter(item =>
    (item.transacao || '').toLowerCase().includes(searchBubbleMetas.toLowerCase()) ||
    (item.mes_ano || '').toLowerCase().includes(searchBubbleMetas.toLowerCase())
  );

  const filteredSupabaseMetas = supabaseMetas.filter(item =>
    (item.transacao || '').toLowerCase().includes(searchSupabaseMetas.toLowerCase()) ||
    (item.mes_ano || '').toLowerCase().includes(searchSupabaseMetas.toLowerCase())
  );

  // Filter local rows (Despesas)
  const filteredBubbleDespesas = bubbleDespesas.filter(item =>
    (item.nome_centro_custos || '').toLowerCase().includes(searchBubbleDespesas.toLowerCase()) ||
    (item.descricao_forma_pagamento || '').toLowerCase().includes(searchBubbleDespesas.toLowerCase()) ||
    (item.descricao_despesa || '').toLowerCase().includes(searchBubbleDespesas.toLowerCase())
  );

  const filteredSupabaseDespesas = supabaseDespesas.filter(item => {
    const matchesSearch = (item.nome_centro_custos || '').toLowerCase().includes(searchSupabaseDespesas.toLowerCase()) ||
      (item.descricao_forma_pagamento || '').toLowerCase().includes(searchSupabaseDespesas.toLowerCase()) ||
      (item.descricao_despesa || '').toLowerCase().includes(searchSupabaseDespesas.toLowerCase());

    if (!matchesSearch) return false;

    // Filtro de Centro de Custos
    if (selectedCentroCustoDespesas) {
      const cc = supabaseCentroCusto.find(c => c.id === selectedCentroCustoDespesas);
      const ccName = cc?.nome_centro_custo || cc?.descricao || '';
      const matchId = item.centro_custo_id === selectedCentroCustoDespesas;
      const matchName = ccName && (item.nome_centro_custos || '').toLowerCase() === ccName.toLowerCase();
      if (!matchId && !matchName) return false;
    }

    if (currentTab === 'despesas' && (periodoInicioDespesas || periodoFimDespesas)) {
      const itemDateStr = item.data_despesa ? item.data_despesa.split('T')[0] : '';
      if (!itemDateStr) return false;
      if (periodoInicioDespesas && itemDateStr < periodoInicioDespesas) return false;
      if (periodoFimDespesas && itemDateStr > periodoFimDespesas) return false;
    }
    return true;
  });

  const sortedSupabaseDespesas = [...filteredSupabaseDespesas].sort((a, b) => {
    const dateA = a.data_despesa || '';
    const dateB = b.data_despesa || '';
    return dateB.localeCompare(dateA);
  });

  // Filter local rows (Entradas)
  const filteredBubbleEntradas = bubbleEntradas.filter(item =>
    (item.descricao_entrada || '').toLowerCase().includes(searchBubbleEntradas.toLowerCase()) ||
    (item.nome_pessoa || '').toLowerCase().includes(searchBubbleEntradas.toLowerCase()) ||
    (item.nome_centro_custo || '').toLowerCase().includes(searchBubbleEntradas.toLowerCase()) ||
    (item.placa_veiculo || '').toLowerCase().includes(searchBubbleEntradas.toLowerCase())
  );

  const filteredSupabaseEntradas = supabaseEntradas.filter(item => {
    const matchesSearch = (item.descricao_entrada || '').toLowerCase().includes(searchSupabaseEntradas.toLowerCase()) ||
      (item.nome_pessoa || '').toLowerCase().includes(searchSupabaseEntradas.toLowerCase()) ||
      (item.nome_centro_custo || '').toLowerCase().includes(searchSupabaseEntradas.toLowerCase()) ||
      (item.placa_veiculo || '').toLowerCase().includes(searchSupabaseEntradas.toLowerCase());

    if (!matchesSearch) return false;

    // Filtro de Centro de Custos
    if (selectedCentroCustoEntradas) {
      const cc = supabaseCentroCusto.find(c => c.id === selectedCentroCustoEntradas);
      const ccName = cc?.nome_centro_custo || cc?.descricao || '';
      const matchId = item.centro_custo_id === selectedCentroCustoEntradas;
      const matchName = ccName && (item.nome_centro_custo || '').toLowerCase() === ccName.toLowerCase();
      if (!matchId && !matchName) return false;
    }

    // Filtro de Período ou Mês Atual por padrão
    if (periodoInicioEntradas || periodoFimEntradas) {
      const itemDateStr = item.data_entrada ? item.data_entrada.split('T')[0] : '';
      if (!itemDateStr) return false;
      if (periodoInicioEntradas && itemDateStr < periodoInicioEntradas) return false;
      if (periodoFimEntradas && itemDateStr > periodoFimEntradas) return false;
    } else {
      // Exibe apenas o mês atual inicialmente na abertura
      const itemDateStr = item.data_entrada ? item.data_entrada.split('T')[0] : '';
      if (!itemDateStr) return false;

      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
      const currentYearMonth = `${currentYear}-${currentMonth}`; // ex: "2026-05"

      const itemYearMonth = itemDateStr.substring(0, 7); // ex: "2026-05"
      if (itemYearMonth !== currentYearMonth) {
        return false;
      }
    }
    return true;
  });

  if (loadingAuth) {
    return (
      <div className="min-h-screen w-screen bg-[#090b11] light-theme:bg-slate-50 flex flex-col items-center justify-center gap-4 text-white font-sans relative">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-900/30 animate-pulse relative z-10">
          <Truck className="h-8 w-8 text-white" />
        </div>
        <div className="flex items-center gap-2 relative z-10 mt-2 text-slate-400">
          <Loader2 className="h-4.5 w-4.5 animate-spin text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#64748b]">Carregando sessão...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return renderLoginScreen();
  }

  return (
    <div className="min-h-screen h-screen w-screen overflow-hidden bg-[#090b11] light-theme:bg-slate-50 text-white flex font-sans selection:bg-violet-600/30">
      {/* 1. Left Sidebar Navigation Panel */}
      {renderSidebar()}

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Top Header */}
        {renderHeader()}

        {/* Workspace Display Area */}
        <main className="flex-1 overflow-hidden p-6 md:p-8 flex flex-col min-h-0 relative">

          {/* Dynamic Background subtle glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-600/5 via-transparent to-transparent -z-10 pointer-events-none" />

          {currentTab === 'dashboard' && renderDashboard()}
          {currentTab === 'entradas' && renderEntradas()}
          {currentTab === 'despesas' && renderDespesas()}
          {currentTab === 'mensalistas' && renderMensalistas()}
          {currentTab === 'pessoas' && renderPessoas()}
          {currentTab === 'veiculos' && renderVeiculos()}
          {currentTab === 'formapagamento' && renderFormaPagamento()}
          {currentTab === 'centrocusto' && renderCentroCusto()}
          {currentTab === 'ordemservico' && renderOrdemServico()}
          {currentTab === 'laudo' && renderLaudo()}

          {currentTab === 'migracoes' && (
            <div className="h-full flex flex-col gap-6 overflow-hidden min-h-0">
              {renderMigrationScreenControlHeader()}

              {/* Splicing the original layout split-grids to ensure 100% feature parity */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 overflow-hidden">
                {/* LEFT COLUMN: Bubble.io Grid */}
                <section className="bg-palette-dark/40 border border-palette-medium/30 rounded-2xl p-5 flex flex-col backdrop-blur-md">
                  {activeForm === 'pessoas' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Cloud className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Bubble.io Pessoas</h2>
                            <p className="text-xxs text-palette-light/50">Dados da API de Origem</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {bubbleData.length} total
                          </span>
                          <button
                            onClick={fetchBubbleData}
                            disabled={loadingBubble}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingBubble ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por nome, CPF ou CNPJ..."
                          value={searchBubble}
                          onChange={e => setSearchBubble(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingBubble && bubbleData.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Carregando dados da API do Bubble.io...</span>
                          </div>
                        ) : filteredBubble.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/30 border border-dashed border-palette-medium/30 rounded-2xl gap-2">
                            <Info className="h-6 w-6 text-palette-light/40" />
                            <span className="text-xs font-medium">Nenhum registro encontrado</span>
                          </div>
                        ) : (
                          filteredBubble.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <User className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.nome_pessoa}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      <CreditCard className="h-3 w-3" />
                                      {item.cpf && item.cpf !== 'N/A' ? `CPF: ${item.cpf}` : item.cnpj && item.cnpj !== 'N/A' ? `CNPJ: ${item.cnpj}` : 'Sem Documento'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Phone className="h-3 w-3" /> {item.celular_whatsapp}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className="text-xxs font-semibold px-2 py-0.5 rounded-full bg-palette-deep border border-palette-medium/40 text-palette-light/75 capitalize">
                                  {item.tipo_pessoa}
                                </span>
                                <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'veiculos' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Cloud className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Bubble.io Veículos</h2>
                            <p className="text-xxs text-palette-light/50">Dados da API de Origem</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {bubbleVehicles.length} total
                          </span>
                          <button
                            onClick={fetchBubbleVehicles}
                            disabled={loadingBubbleVehicles}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingBubbleVehicles ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por placa, modelo ou proprietário..."
                          value={searchBubbleVehicles}
                          onChange={e => setSearchBubbleVehicles(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingBubbleVehicles && bubbleVehicles.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Carregando dados da API do Bubble.io...</span>
                          </div>
                        ) : filteredBubbleVehicles.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-2">
                            <Info className="h-6 w-6 text-palette-light/40" />
                            <span className="text-xs font-medium">Nenhum veículo encontrado</span>
                          </div>
                        ) : (
                          filteredBubbleVehicles.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <Car className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-palette-medium/20 border border-palette-medium/40 text-palette-light text-xxs font-bold uppercase tracking-wide">
                                      {item.placa}
                                    </span>
                                    <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                      {item.marca_modelo}
                                    </h4>
                                  </div>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      <User className="h-3 w-3" /> Proprietário: {item.pessoa_nome}
                                    </span>
                                    {item.motorista && item.motorista.length > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light/45">
                                        🚘 Motorista: {Array.isArray(item.motorista) ? item.motorista.join(', ') : item.motorista}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className="text-xxs font-semibold px-2 py-0.5 rounded-full bg-palette-deep border border-palette-medium/40 text-palette-light/75 capitalize">
                                  {item.tipo}
                                </span>
                                <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'centrocusto' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Cloud className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Bubble.io Centro de Custos</h2>
                            <p className="text-xxs text-palette-light/50">Dados da API de Origem</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {bubbleCentroCusto.length} total
                          </span>
                          <button
                            onClick={fetchBubbleCentroCusto}
                            disabled={loadingBubbleCentroCusto}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingBubbleCentroCusto ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por nome, descrição ou recorrência..."
                          value={searchBubbleCentroCusto}
                          onChange={e => setSearchBubbleCentroCusto(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingBubbleCentroCusto && bubbleCentroCusto.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Carregando dados da API do Bubble.io...</span>
                          </div>
                        ) : filteredBubbleCentroCusto.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-2">
                            <Info className="h-6 w-6 text-palette-light/40" />
                            <span className="text-xs font-medium">Nenhum centro de custo encontrado</span>
                          </div>
                        ) : (
                          filteredBubbleCentroCusto.map(item => {
                            const movLower = String(item.tipo_movimentacao || '').toLowerCase();
                            const isEntrada = movLower.includes('entrada') || movLower.includes('receita');
                            const isDespesa = movLower.includes('despesa') || movLower.includes('custo') || movLower.includes('saida') || movLower.includes('saída');

                            let dotBg = 'bg-slate-500';
                            let typeLabel = 'Outros';
                            if (isEntrada) {
                              dotBg = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
                              typeLabel = 'Entrada';
                            } else if (isDespesa) {
                              dotBg = 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]';
                              typeLabel = 'Despesa';
                            }

                            const recStr = String(item.tipo_recorrencia || '').trim();
                            const hasRecorrencia = recStr.length > 0 && recStr.toLowerCase() !== 'não informado' && recStr.toLowerCase() !== 'null';

                            return (
                              <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                                <div className="flex items-start gap-3">
                                  <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                    <CreditCard className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                        {item.nome_centro_custo}
                                      </h4>
                                      {hasRecorrencia && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-palette-medium/20 text-palette-light/75 border border-palette-medium/30 leading-none">
                                          {recStr.toLowerCase().includes('fixo') ? 'Fixo' :
                                            recStr.toLowerCase().includes('varia') ? 'Variável' :
                                              recStr}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xxs text-palette-light/75 mt-0.5 font-medium">{item.descricao}</p>
                                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-palette-light/50 text-xxs font-medium">
                                      <span className="flex items-center gap-1">
                                        🔄 Recorrência: <strong className="text-palette-light/75">{item.tipo_recorrencia}</strong>
                                      </span>
                                      <span className="flex items-center gap-1">
                                        📈 Tipo: <strong className="text-palette-light/75">{item.tipo_movimentacao}</strong>
                                      </span>
                                      {item.valor_provisao !== undefined && item.valor_provisao > 0 && (
                                        <span className="flex items-center gap-1 text-palette-light font-bold">
                                          💰 Provisão: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_provisao)}</strong>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center">
                                  <div className="flex items-center gap-1.5 bg-palette-deep/80 px-2 py-1 rounded-lg border border-palette-medium/30">
                                    <span className={`h-2 w-2 rounded-full ${dotBg} animate-pulse`} title={typeLabel} />
                                    <span className="text-[8px] font-bold text-palette-light/60 uppercase tracking-wider leading-none">{typeLabel}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </>
                  ) : activeForm === 'formapagamento' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Cloud className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Bubble.io Formas de Pagamento</h2>
                            <p className="text-xxs text-palette-light/50">Dados da API de Origem</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {bubbleFormaPagamento.length} total
                          </span>
                          <button
                            onClick={fetchBubbleFormaPagamento}
                            disabled={loadingBubbleFormaPagamento}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingBubbleFormaPagamento ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por descrição ou tipo..."
                          value={searchBubbleFormaPagamento}
                          onChange={e => setSearchBubbleFormaPagamento(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingBubbleFormaPagamento && bubbleFormaPagamento.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Carregando dados da API do Bubble.io...</span>
                          </div>
                        ) : filteredBubbleFormaPagamento.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-2">
                            <Info className="h-6 w-6 text-palette-light/40" />
                            <span className="text-xs font-medium">Nenhuma forma de pagamento encontrada</span>
                          </div>
                        ) : (
                          filteredBubbleFormaPagamento.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <Wallet className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.descricao}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      💳 Tipo de Transação: <strong className="text-palette-light/75">{item.tipo_transacao}</strong>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'mensalistas' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Cloud className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Bubble.io Mensalistas</h2>
                            <p className="text-xxs text-palette-light/50">Dados da API de Origem</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {bubbleMensalistas.length} total
                          </span>
                          <button
                            onClick={fetchBubbleMensalistas}
                            disabled={loadingBubbleMensalistas}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingBubbleMensalistas ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por nome, placa, modelo ou plano..."
                          value={searchBubbleMensalistas}
                          onChange={e => setSearchBubbleMensalistas(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingBubbleMensalistas && bubbleMensalistas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Carregando dados da API do Bubble.io...</span>
                          </div>
                        ) : filteredBubbleMensalistas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-2">
                            <Info className="h-6 w-6 text-palette-light/40" />
                            <span className="text-xs font-medium">Nenhum mensalista encontrado</span>
                          </div>
                        ) : (
                          filteredBubbleMensalistas.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <Calendar className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.nome_pessoa}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    {item.plano && (
                                      <span className="flex items-center gap-1">
                                        📋 Plano: <strong className="text-palette-light/75">{item.plano}</strong>
                                      </span>
                                    )}
                                    {item.placa && (
                                      <span className="flex items-center gap-1 bg-palette-medium/20 px-1 py-0.2 rounded border border-palette-medium/30 text-palette-light text-xxs">
                                        🚗 {item.placa} ({item.marca_modelo || 'N/A'})
                                      </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                      📅 Vencimento: <strong className="text-palette-light/75">Dia {item.dia_vencimento || 'N/A'}</strong>
                                    </span>
                                    {item.valor_original !== undefined && item.valor_original > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light font-bold">
                                        💰 Valor: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_original)}</strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'mensalistaparcelas' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Cloud className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Bubble.io Mensalistas Parcelas</h2>
                            <p className="text-xxs text-palette-light/50">Dados da API de Origem</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {bubbleMensalistaParcelas.length} total
                          </span>
                          <button
                            onClick={fetchBubbleMensalistaParcelas}
                            disabled={loadingBubbleMensalistaParcelas}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingBubbleMensalistaParcelas ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por nome, ID ou ID do mensalista..."
                          value={searchBubbleMensalistaParcelas}
                          onChange={e => setSearchBubbleMensalistaParcelas(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingBubbleMensalistaParcelas && bubbleMensalistaParcelas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Carregando dados da API do Bubble.io...</span>
                          </div>
                        ) : filteredBubbleMensalistaParcelas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-2">
                            <Info className="h-6 w-6 text-palette-light/40" />
                            <span className="text-xs font-medium">Nenhuma parcela encontrada</span>
                          </div>
                        ) : (
                          filteredBubbleMensalistaParcelas.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <Layers className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.nome_pessoa || 'Parcela Sem Nome'}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      📅 Ref: <strong className="text-palette-light/75">{item.referencia || 'N/A'}</strong>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      💰 Parcela: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_parcela || 0)}</strong>
                                    </span>
                                    {item.valor_pago !== undefined && item.valor_pago > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light font-bold">
                                        💸 Pago: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_pago)}</strong>
                                      </span>
                                    )}
                                    {item.data_pagamento && (
                                      <span className="flex items-center gap-1 text-palette-light/45">
                                        ✅ Pago em: {new Date(item.data_pagamento).toLocaleDateString('pt-BR')}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className="text-xxs font-bold px-2 py-0.5 rounded bg-palette-medium/20 border border-palette-medium/30 text-palette-light">
                                  {item.status || 'Pendente'}
                                </span>
                                <span className={`h-2 w-2 rounded-full ${item.status === 'Pago' ? 'bg-emerald-500' : item.status === 'Atrasado' ? 'bg-red-500' : 'bg-amber-500'}`} title={item.status || 'Pendente'} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'metas' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Cloud className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Bubble.io Metas</h2>
                            <p className="text-xxs text-palette-light/50">Dados da API de Origem</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {bubbleMetas.length} total
                          </span>
                          <button
                            onClick={fetchBubbleMetas}
                            disabled={loadingBubbleMetas}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingBubbleMetas ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por mês/ano ou transação..."
                          value={searchBubbleMetas}
                          onChange={e => setSearchBubbleMetas(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingBubbleMetas && bubbleMetas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Carregando dados da API do Bubble.io...</span>
                          </div>
                        ) : filteredBubbleMetas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-2">
                            <Info className="h-6 w-6 text-palette-light/40" />
                            <span className="text-xs font-medium">Nenhuma meta encontrada</span>
                          </div>
                        ) : (
                          filteredBubbleMetas.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <Target className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.mes_ano || 'Sem Mês/Ano'}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      🔄 Transação: <strong className={item.transacao === 'Entradas' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{item.transacao || 'Não Informado'}</strong>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      📅 Data Meta: <strong>{item.data_meta ? new Date(item.data_meta).toLocaleDateString('pt-BR') : 'N/A'}</strong>
                                    </span>
                                    {item.valor !== undefined && item.valor > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light font-bold">
                                        💰 Valor: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}</strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className="text-xxs font-bold px-2 py-0.5 rounded bg-palette-medium/20 border border-palette-medium/30 text-palette-light">
                                  {item.transacao === 'Entradas' ? 'Receita' : 'Despesa'}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'despesas' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Cloud className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Bubble.io Despesas</h2>
                            <p className="text-xxs text-palette-light/50">Dados da API de Origem</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {bubbleDespesas.length} total
                          </span>
                          <button
                            onClick={fetchBubbleDespesas}
                            disabled={loadingBubbleDespesas}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingBubbleDespesas ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por centro de custos ou forma de pagamento..."
                          value={searchBubbleDespesas}
                          onChange={e => setSearchBubbleDespesas(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingBubbleDespesas && bubbleDespesas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Carregando dados da API do Bubble.io...</span>
                          </div>
                        ) : filteredBubbleDespesas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-2">
                            <Info className="h-6 w-6 text-palette-light/40" />
                            <span className="text-xs font-medium">Nenhuma despesa encontrada</span>
                          </div>
                        ) : (
                          filteredBubbleDespesas.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <DollarSign className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.nome_centro_custos || 'Sem Centro de Custo'}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      💳 Forma: <strong>{item.descricao_forma_pagamento || 'N/A'}</strong>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      📅 Data: <strong>{item.data_despesa ? new Date(item.data_despesa).toLocaleDateString('pt-BR') : 'N/A'}</strong>
                                    </span>
                                    {item.valor !== undefined && item.valor > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light font-bold">
                                        💰 Valor: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}</strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                {item.valor_provisao !== undefined && item.valor_provisao > 0 && (
                                  <span className="text-xxs font-bold px-2 py-0.5 rounded bg-palette-medium/20 border border-palette-medium/30 text-palette-light" title="Valor Provisão">
                                    Provisão: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_provisao)}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Cloud className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Bubble.io Entradas</h2>
                            <p className="text-xxs text-palette-light/50">Dados da API de Desenvolvimento</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {bubbleEntradas.length} registros
                          </span>
                          <button
                            onClick={fetchBubbleEntradas}
                            disabled={loadingBubbleEntradas}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingBubbleEntradas ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por descrição, pessoa, veículo ou centro..."
                          value={searchBubbleEntradas}
                          onChange={e => setSearchBubbleEntradas(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingBubbleEntradas ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Consultando banco de dados no Bubble.io...</span>
                          </div>
                        ) : filteredBubbleEntradas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-2">
                            <Info className="h-6 w-6 text-palette-light/40" />
                            <span className="text-xs font-medium">Nenhuma entrada encontrada</span>
                          </div>
                        ) : (
                          filteredBubbleEntradas.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <ArrowRightLeft className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.descricao_entrada || 'Sem Descrição'}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    {item.nome_pessoa && (
                                      <span className="flex items-center gap-1 text-palette-light/75">
                                        👤 Pessoa: <strong>{item.nome_pessoa}</strong>
                                      </span>
                                    )}
                                    {item.placa_veiculo && (
                                      <span className="flex items-center gap-1 text-palette-light/60">
                                        🚗 Placa: <strong className="uppercase">{item.placa_veiculo}</strong>
                                      </span>
                                    )}
                                    {item.nome_centro_custo && (
                                      <span className="flex items-center gap-1 text-palette-light/60">
                                        📁 C. Custo: <strong>{item.nome_centro_custo}</strong>
                                      </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                      💳 Forma: <strong>{item.descricao_forma_pagamento || 'N/A'}</strong>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      📅 Data: <strong>{item.data_entrada ? new Date(item.data_entrada).toLocaleDateString('pt-BR') : 'N/A'}</strong>
                                    </span>
                                    {item.valor !== undefined && item.valor > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light font-bold">
                                        💰 Valor: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}</strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </section>

                {/* RIGHT COLUMN: Supabase Grid */}
                <section className="bg-palette-dark/40 border border-palette-medium/30 rounded-2xl p-5 flex flex-col backdrop-blur-md">
                  {activeForm === 'pessoas' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Database className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Supabase Pessoas</h2>
                            <p className="text-xxs text-palette-light/50">Registros em Produção</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {supabaseData.length} total
                          </span>
                          <button
                            onClick={fetchSupabaseData}
                            disabled={loadingSupabase}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingSupabase ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por nome, CPF ou CNPJ..."
                          value={searchSupabase}
                          onChange={e => setSearchSupabase(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingSupabase && supabaseData.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Consultando banco de dados no Supabase...</span>
                          </div>
                        ) : filteredSupabase.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-3 text-center p-6">
                            <div className="h-10 w-10 rounded-full bg-palette-deep border border-palette-medium/30 flex items-center justify-center text-palette-light/40 mx-auto">
                              <Database className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-palette-light block">Supabase Vazio</span>
                              <span className="text-xxs text-palette-light/50 block mt-1">
                                Não existem registros importados na tabela pessoas.
                              </span>
                            </div>
                          </div>
                        ) : (
                          filteredSupabase.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <User className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.nome_pessoa}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      <CreditCard className="h-3 w-3" />
                                      {item.cpf && item.cpf !== 'N/A' ? `CPF: ${item.cpf}` : item.cnpj && item.cnpj !== 'N/A' ? `CNPJ: ${item.cnpj}` : 'Sem Documento'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Phone className="h-3 w-3" /> {item.celular_whatsapp}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className="text-xxs font-semibold px-2 py-0.5 rounded-full bg-palette-deep border border-palette-medium/40 text-palette-light/75 capitalize">
                                  {item.tipo_pessoa}
                                </span>
                                <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'veiculos' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <Database className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-slate-200 text-sm md:text-base">Supabase Veículos</h2>
                            <p className="text-xxs text-slate-500">Registros em Produção</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">
                            {supabaseVehicles.length} total
                          </span>
                          <button
                            onClick={fetchSupabaseVehicles}
                            disabled={loadingSupabaseVehicles}
                            className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 active:bg-slate-900 transition-colors disabled:opacity-50 text-slate-400 hover:text-white"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingSupabaseVehicles ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por placa, modelo ou proprietário..."
                          value={searchSupabaseVehicles}
                          onChange={e => setSearchSupabaseVehicles(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingSupabaseVehicles && supabaseVehicles.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Consultando banco de dados no Supabase...</span>
                          </div>
                        ) : filteredSupabaseVehicles.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-3 text-center p-6">
                            <div className="h-10 w-10 rounded-full bg-palette-deep border border-palette-medium/30 flex items-center justify-center text-palette-light/40 mx-auto">
                              <Database className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-palette-light block">Supabase Vazio</span>
                              <span className="text-xxs text-palette-light/50 block mt-1">
                                Não existem registros importados na tabela veiculos.
                              </span>
                            </div>
                          </div>
                        ) : (
                          filteredSupabaseVehicles.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <Car className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-palette-medium/20 border border-palette-medium/40 text-palette-light text-xxs font-bold uppercase tracking-wide">
                                      {item.placa}
                                    </span>
                                    <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                      {item.marca_modelo}
                                    </h4>
                                  </div>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      <User className="h-3 w-3" /> Proprietário: {item.pessoa_nome}
                                    </span>
                                    {item.motorista && item.motorista.length > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light/45">
                                        🚘 Motorista: {Array.isArray(item.motorista) ? item.motorista.join(', ') : item.motorista}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className="text-xxs font-semibold px-2 py-0.5 rounded-full bg-palette-deep border border-palette-medium/40 text-palette-light/75 capitalize">
                                  {item.tipo}
                                </span>
                                <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'centrocusto' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Database className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Supabase Centro de Custos</h2>
                            <p className="text-xxs text-palette-light/50">Registros em Produção</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {supabaseCentroCusto.length} total
                          </span>
                          <button
                            onClick={fetchSupabaseCentroCusto}
                            disabled={loadingSupabaseCentroCusto}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingSupabaseCentroCusto ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por nome, descrição ou recorrência..."
                          value={searchSupabaseCentroCusto}
                          onChange={e => setSearchSupabaseCentroCusto(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingSupabaseCentroCusto && supabaseCentroCusto.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Consultando banco de dados no Supabase...</span>
                          </div>
                        ) : filteredSupabaseCentroCusto.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-3 text-center p-6">
                            <div className="h-10 w-10 rounded-full bg-palette-deep border border-palette-medium/30 flex items-center justify-center text-palette-light/40 mx-auto">
                              <Database className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-palette-light block">Supabase Vazio</span>
                              <span className="text-xxs text-palette-light/50 block mt-1">
                                Não existem registros importados na tabela centro_custo.
                              </span>
                            </div>
                          </div>
                        ) : (
                          filteredSupabaseCentroCusto.map(item => {
                            const movLower = String(item.tipo_movimentacao || '').toLowerCase();
                            const isEntrada = movLower.includes('entrada') || movLower.includes('receita');
                            const isDespesa = movLower.includes('despesa') || movLower.includes('custo') || movLower.includes('saida') || movLower.includes('saída');

                            let dotBg = 'bg-slate-500';
                            let typeLabel = 'Outros';
                            if (isEntrada) {
                              dotBg = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
                              typeLabel = 'Entrada';
                            } else if (isDespesa) {
                              dotBg = 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]';
                              typeLabel = 'Despesa';
                            }

                            const recStr = String(item.tipo_recorrencia || '').trim();
                            const hasRecorrencia = recStr.length > 0 && recStr.toLowerCase() !== 'não informado' && recStr.toLowerCase() !== 'null';

                            return (
                              <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                                <div className="flex items-start gap-3">
                                  <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/25 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                    <CreditCard className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                        {item.nome_centro_custo}
                                      </h4>
                                      {hasRecorrencia && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-palette-medium/20 text-palette-light/75 border border-palette-medium/30 leading-none">
                                          {recStr.toLowerCase().includes('fixo') ? 'Fixo' :
                                            recStr.toLowerCase().includes('varia') ? 'Variável' :
                                              recStr}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xxs text-palette-light/75 mt-0.5 font-medium">{item.descricao}</p>
                                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-palette-light/50 text-xxs font-medium">
                                      <span className="flex items-center gap-1">
                                        🔄 Recorrência: <strong className="text-palette-light/75">{item.tipo_recorrencia}</strong>
                                      </span>
                                      <span className="flex items-center gap-1">
                                        📈 Tipo: <strong className="text-palette-light/75">{item.tipo_movimentacao}</strong>
                                      </span>
                                      {item.valor_provisao !== undefined && item.valor_provisao > 0 && (
                                        <span className="flex items-center gap-1 text-palette-light font-bold">
                                          💰 Provisão: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_provisao)}</strong>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center">
                                  <div className="flex items-center gap-1.5 bg-palette-deep/80 px-2 py-1 rounded-lg border border-palette-medium/30">
                                    <span className={`h-2 w-2 rounded-full ${dotBg} animate-pulse`} title={typeLabel} />
                                    <span className="text-[8px] font-bold text-palette-light/60 uppercase tracking-wider leading-none">{typeLabel}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </>
                  ) : activeForm === 'formapagamento' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Database className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Supabase Formas de Pagamento</h2>
                            <p className="text-xxs text-palette-light/50">Registros em Produção</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {supabaseFormaPagamento.length} total
                          </span>
                          <button
                            onClick={fetchSupabaseFormaPagamento}
                            disabled={loadingSupabaseFormaPagamento}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingSupabaseFormaPagamento ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por descrição ou tipo..."
                          value={searchSupabaseFormaPagamento}
                          onChange={e => setSearchSupabaseFormaPagamento(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingSupabaseFormaPagamento && supabaseFormaPagamento.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Consultando banco de dados no Supabase...</span>
                          </div>
                        ) : filteredSupabaseFormaPagamento.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-3 text-center p-6">
                            <div className="h-10 w-10 rounded-full bg-palette-deep border border-palette-medium/30 flex items-center justify-center text-palette-light/40 mx-auto">
                              <Database className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-palette-light block">Supabase Vazio</span>
                              <span className="text-xxs text-palette-light/50 block mt-1">
                                Não existem registros importados na tabela formapagamento.
                              </span>
                            </div>
                          </div>
                        ) : (
                          filteredSupabaseFormaPagamento.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <Wallet className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.descricao}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      💳 Tipo de Transação: <strong className="text-palette-light/75">{item.tipo_transacao}</strong>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'mensalistas' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Database className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Supabase Mensalistas</h2>
                            <p className="text-xxs text-palette-light/50">Registros em Produção</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {supabaseMensalistas.length} total
                          </span>
                          <button
                            onClick={fetchSupabaseMensalistas}
                            disabled={loadingSupabaseMensalistas}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingSupabaseMensalistas ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por nome, placa, modelo ou plano..."
                          value={searchSupabaseMensalistas}
                          onChange={e => setSearchSupabaseMensalistas(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingSupabaseMensalistas && supabaseMensalistas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Consultando banco de dados no Supabase...</span>
                          </div>
                        ) : filteredSupabaseMensalistas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-3 text-center p-6">
                            <div className="h-10 w-10 rounded-full bg-palette-deep border border-palette-medium/30 flex items-center justify-center text-palette-light/40 mx-auto">
                              <Database className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-palette-light block">Supabase Vazio</span>
                              <span className="text-xxs text-palette-light/50 block mt-1">
                                Não existem registros importados na tabela mensalistas.
                              </span>
                            </div>
                          </div>
                        ) : (
                          filteredSupabaseMensalistas.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <Calendar className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.nome_pessoa}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    {item.plano && (
                                      <span className="flex items-center gap-1">
                                        📋 Plano: <strong className="text-palette-light/75">{item.plano}</strong>
                                      </span>
                                    )}
                                    {item.placa && (
                                      <span className="flex items-center gap-1 bg-palette-medium/20 px-1 py-0.2 rounded border border-palette-medium/30 text-palette-light text-xxs">
                                        🚗 {item.placa} ({item.marca_modelo || 'N/A'})
                                      </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                      📅 Vencimento: <strong className="text-palette-light/75">Dia {item.dia_vencimento || 'N/A'}</strong>
                                    </span>
                                    {item.valor_original !== undefined && item.valor_original > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light font-bold">
                                        💰 Valor: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_original)}</strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'mensalistaparcelas' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Database className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Supabase Mensalistas Parcelas</h2>
                            <p className="text-xxs text-palette-light/50">Registros em Produção</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {supabaseMensalistaParcelas.length} total
                          </span>
                          <button
                            onClick={fetchSupabaseMensalistaParcelas}
                            disabled={loadingSupabaseMensalistaParcelas}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingSupabaseMensalistaParcelas ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por nome, ID ou ID do mensalista..."
                          value={searchSupabaseMensalistaParcelas}
                          onChange={e => setSearchSupabaseMensalistaParcelas(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingSupabaseMensalistaParcelas && supabaseMensalistaParcelas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Consultando banco de dados no Supabase...</span>
                          </div>
                        ) : filteredSupabaseMensalistaParcelas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-3 text-center p-6">
                            <div className="h-10 w-10 rounded-full bg-palette-deep border border-palette-medium/30 flex items-center justify-center text-palette-light/40 mx-auto">
                              <Database className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-palette-light block">Supabase Vazio</span>
                              <span className="text-xxs text-palette-light/50 block mt-1">
                                Não existem registros importados na tabela mensalistas_parcelas.
                              </span>
                            </div>
                          </div>
                        ) : (
                          filteredSupabaseMensalistaParcelas.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <Layers className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.nome_pessoa || 'Parcela Sem Nome'}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      📅 Ref: <strong className="text-palette-light/75">{item.referencia || 'N/A'}</strong>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      💰 Parcela: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_parcela || 0)}</strong>
                                    </span>
                                    {item.valor_pago !== undefined && item.valor_pago > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light font-bold">
                                        💸 Pago: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_pago)}</strong>
                                      </span>
                                    )}
                                    {item.data_pagamento && (
                                      <span className="flex items-center gap-1 text-palette-light/45">
                                        ✅ Pago em: {new Date(item.data_pagamento).toLocaleDateString('pt-BR')}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className="text-xxs font-bold px-2 py-0.5 rounded bg-palette-medium/20 border border-palette-medium/30 text-palette-light">
                                  {item.status || 'Pendente'}
                                </span>
                                <span className={`h-2 w-2 rounded-full ${item.status === 'Pago' ? 'bg-emerald-500' : item.status === 'Atrasado' ? 'bg-red-500' : 'bg-amber-500'}`} title={item.status || 'Pendente'} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'metas' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Database className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Supabase Metas</h2>
                            <p className="text-xxs text-palette-light/50">Registros em Produção</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {supabaseMetas.length} total
                          </span>
                          <button
                            onClick={fetchSupabaseMetas}
                            disabled={loadingSupabaseMetas}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingSupabaseMetas ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por mês/ano ou transação..."
                          value={searchSupabaseMetas}
                          onChange={e => setSearchSupabaseMetas(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingSupabaseMetas && supabaseMetas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Consultando banco de dados no Supabase...</span>
                          </div>
                        ) : filteredSupabaseMetas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-3 text-center p-6">
                            <div className="h-10 w-10 rounded-full bg-palette-deep border border-palette-medium/30 flex items-center justify-center text-palette-light/40 mx-auto">
                              <Database className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-palette-light block">Supabase Vazio</span>
                              <span className="text-xxs text-palette-light/50 block mt-1">
                                Não existem registros importados na tabela metas.
                              </span>
                            </div>
                          </div>
                        ) : (
                          filteredSupabaseMetas.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <Target className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.mes_ano || 'Sem Mês/Ano'}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      🔄 Transação: <strong className={item.transacao === 'Entradas' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{item.transacao || 'Não Informado'}</strong>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      📅 Data Meta: <strong>{item.data_meta ? new Date(item.data_meta).toLocaleDateString('pt-BR') : 'N/A'}</strong>
                                    </span>
                                    {item.valor !== undefined && item.valor > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light font-bold">
                                        💰 Valor: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}</strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <span className="text-xxs font-bold px-2 py-0.5 rounded bg-palette-medium/20 border border-palette-medium/30 text-palette-light">
                                  {item.transacao === 'Entradas' ? 'Receita' : 'Despesa'}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : activeForm === 'despesas' ? (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Database className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Supabase Despesas</h2>
                            <p className="text-xxs text-palette-light/50">Registros em Produção</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {supabaseDespesas.length} total
                          </span>
                          <button
                            onClick={fetchSupabaseDespesas}
                            disabled={loadingSupabaseDespesas}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingSupabaseDespesas ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por centro de custos ou forma de pagamento..."
                          value={searchSupabaseDespesas}
                          onChange={e => setSearchSupabaseDespesas(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingSupabaseDespesas && supabaseDespesas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Consultando banco de dados no Supabase...</span>
                          </div>
                        ) : filteredSupabaseDespesas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-3 text-center p-6">
                            <div className="h-10 w-10 rounded-full bg-palette-deep border border-palette-medium/30 flex items-center justify-center text-palette-light/40 mx-auto">
                              <Database className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-palette-light block">Supabase Vazio</span>
                              <span className="text-xxs text-palette-light/50 block mt-1">
                                Não existem registros importados na tabela despesas.
                              </span>
                            </div>
                          </div>
                        ) : (
                          filteredSupabaseDespesas.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <DollarSign className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.nome_centro_custos || 'Sem Centro de Custo'}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    <span className="flex items-center gap-1">
                                      💳 Forma: <strong>{item.descricao_forma_pagamento || 'N/A'}</strong>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      📅 Data: <strong>{item.data_despesa ? new Date(item.data_despesa).toLocaleDateString('pt-BR') : 'N/A'}</strong>
                                    </span>
                                    {item.valor !== undefined && item.valor > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light font-bold">
                                        💰 Valor: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}</strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                {item.valor_provisao !== undefined && item.valor_provisao > 0 && (
                                  <span className="text-xxs font-bold px-2 py-0.5 rounded bg-palette-medium/20 border border-palette-medium/30 text-palette-light" title="Valor Provisão">
                                    Provisão: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_provisao)}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                            <Database className="h-4 w-4" />
                          </div>
                          <div>
                            <h2 className="font-bold text-palette-light text-sm md:text-base">Supabase Entradas</h2>
                            <p className="text-xxs text-palette-light/50">Registros em Produção</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-palette-light/80 px-2 py-0.5 rounded-md bg-palette-deep border border-palette-medium/40">
                            {supabaseEntradas.length} total
                          </span>
                          <button
                            onClick={fetchSupabaseEntradas}
                            disabled={loadingSupabaseEntradas}
                            className="h-8 w-8 rounded-lg bg-palette-deep border border-palette-medium/40 flex items-center justify-center hover:bg-palette-medium/20 active:bg-palette-deep transition-colors disabled:opacity-50 text-palette-light/75 hover:text-palette-light"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingSupabaseEntradas ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Search bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-palette-light/40 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Buscar por descrição, pessoa, veículo ou centro..."
                          value={searchSupabaseEntradas}
                          onChange={e => setSearchSupabaseEntradas(e.target.value)}
                          className="w-full bg-palette-deep/60 border border-palette-medium/40 rounded-xl py-2 pl-10 pr-4 text-sm text-palette-light placeholder:text-palette-light/30 focus:outline-none focus:border-palette-medium transition-colors"
                        />
                      </div>

                      {/* Records List */}
                      <div className="flex-1 overflow-y-auto h-[calc(100vh-230px)] pr-2 space-y-2 custom-scrollbar">
                        {loadingSupabaseEntradas ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/40 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-palette-light" />
                            <span className="text-xs">Consultando banco de dados no Supabase...</span>
                          </div>
                        ) : filteredSupabaseEntradas.length === 0 ? (
                          <div className="h-60 flex flex-col items-center justify-center text-palette-light/35 border border-dashed border-palette-medium/30 rounded-2xl gap-2">
                            <Info className="h-6 w-6 text-palette-light/40" />
                            <span className="text-xs font-medium">Nenhuma entrada importada</span>
                          </div>
                        ) : (
                          filteredSupabaseEntradas.map(item => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                                  <ArrowRightLeft className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                                    {item.descricao_entrada || 'Sem Descrição'}
                                  </h4>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-palette-light/50 text-xxs font-medium">
                                    {item.nome_pessoa && (
                                      <span className="flex items-center gap-1 text-palette-light/75">
                                        👤 Pessoa: <strong>{item.nome_pessoa}</strong>
                                      </span>
                                    )}
                                    {item.placa_veiculo && (
                                      <span className="flex items-center gap-1 text-palette-light/60">
                                        🚗 Placa: <strong className="uppercase">{item.placa_veiculo}</strong>
                                      </span>
                                    )}
                                    {item.nome_centro_custo && (
                                      <span className="flex items-center gap-1 text-palette-light/60">
                                        📁 C. Custo: <strong>{item.nome_centro_custo}</strong>
                                      </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                      💳 Forma: <strong>{item.descricao_forma_pagamento || 'N/A'}</strong>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      📅 Data: <strong>{item.data_entrada ? new Date(item.data_entrada).toLocaleDateString('pt-BR') : 'N/A'}</strong>
                                    </span>
                                    {item.valor !== undefined && item.valor > 0 && (
                                      <span className="flex items-center gap-1 text-palette-light font-bold">
                                        💰 Valor: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}</strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </section>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* 1. MIGRATION PROCESS PROGRESS MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => migrationStatus !== 'running' && setIsModalOpen(false)}
              className="absolute inset-0 bg-palette-deep/80 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-xl bg-palette-deep border border-palette-medium/40 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-5"
            >
              {/* Card top banner glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-palette-medium via-palette-light to-palette-medium animate-pulse" />

              {/* Title & Status */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-palette-medium/20 flex items-center justify-center text-palette-light">
                  {migrationStatus === 'running' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : migrationStatus === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-palette-light text-base">Processando Importação</h3>
                  <p className="text-xxs text-palette-light/50">Bubble.io ➔ Supabase DB Client Sync</p>
                </div>
              </div>

              {/* Progress Count & Progress Bar */}
              <div className="space-y-2 mt-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-palette-light/75">
                    {migrationStatus === 'running' ? 'Inserindo registros...' : 'Importação concluída!'}
                  </span>
                  <span className="text-palette-light text-sm font-bold">{progress}%</span>
                </div>

                {/* Progress bar wrap */}
                <div className="h-2.5 w-full bg-palette-dark rounded-full border border-palette-medium/40 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-palette-medium to-palette-light rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between text-xxs text-palette-light/50 pt-0.5">
                  <span>Migrados: <strong>{migratedCount}</strong> de <strong>{totalToMigrate}</strong></span>
                  {migrationStatus === 'running' && (
                    <span className="flex items-center gap-1 text-palette-light/45 font-medium">
                      <span className="h-1 w-1 rounded-full bg-palette-light/45 animate-ping" />
                      Não feche esta janela
                    </span>
                  )}
                </div>
              </div>

              {/* Real-time Logger Console Terminal */}
              <div className="bg-palette-dark border border-palette-medium/35 rounded-xl p-3 h-44 overflow-y-auto flex flex-col gap-1.5 font-mono text-xxs text-palette-light/85 custom-scrollbar shadow-inner">
                {logs.map((log, index) => (
                  <div key={index} className="leading-relaxed whitespace-pre-wrap">
                    {log}
                  </div>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 mt-1">
                {migrationStatus !== 'running' && (
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-lg bg-palette-dark hover:bg-palette-medium/20 border border-palette-medium/40 text-palette-light/90 font-bold text-xs hover:text-white transition-colors"
                  >
                    Fechar
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CONFIRM WIPE VERIFICATION MODAL */}
      <AnimatePresence>
        {isConfirmingWipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !wiping && setIsConfirmingWipe(false)}
              className="absolute inset-0 bg-palette-deep/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-palette-deep border border-red-900/40 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-4"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />

              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0">
                  <ShieldAlert className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="font-bold text-palette-light text-base">Esvaziar Tabelas?</h3>
                  <p className="text-xxs text-palette-light/50 mt-1">
                    Esta ação irá excluir permanentemente todos os registros de {activeForm === 'pessoas' ? 'pessoas' : activeForm === 'veiculos' ? 'veículos' : activeForm === 'centrocusto' ? 'centro de custos' : activeForm === 'formapagamento' ? 'formas de pagamento' : activeForm === 'mensalistas' ? 'mensalistas' : activeForm === 'mensalistaparcelas' ? 'mensalistas parcelas' : activeForm === 'metas' ? 'metas' : 'despesas'} inseridos no Supabase.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-2">
                <button
                  onClick={() => setIsConfirmingWipe(false)}
                  disabled={wiping}
                  className="px-4 py-2 rounded-lg bg-palette-dark hover:bg-palette-medium/20 border border-palette-medium/40 text-palette-light/60 font-bold text-xs transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClearDatabase}
                  disabled={wiping}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/10 transition-colors"
                >
                  {wiping ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  <span>Sim, Esvaziar</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;