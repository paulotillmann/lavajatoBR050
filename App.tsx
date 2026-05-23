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
  AlertTriangle
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
          
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#121626] to-[#0a0c14] light-theme:from-indigo-950 light-theme:to-slate-900 p-8 sm:p-12 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#1f2433] light-theme:border-slate-800/40">
            {/* Background Image with slight blur */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-35 light-theme:opacity-[0.25] blur-[1px] pointer-events-none"
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

  // Veiculos Data states
  const [bubbleVehicles, setBubbleVehicles] = useState<Veiculo[]>([]);
  const [supabaseVehicles, setSupabaseVehicles] = useState<Veiculo[]>([]);
  const [loadingBubbleVehicles, setLoadingBubbleVehicles] = useState(false);
  const [loadingSupabaseVehicles, setLoadingSupabaseVehicles] = useState(false);

  // Veiculos Filter/Search states
  const [searchBubbleVehicles, setSearchBubbleVehicles] = useState('');
  const [searchSupabaseVehicles, setSearchSupabaseVehicles] = useState('');

  // Centro Custo Data states
  const [bubbleCentroCusto, setBubbleCentroCusto] = useState<CentroCusto[]>([]);
  const [supabaseCentroCusto, setSupabaseCentroCusto] = useState<CentroCusto[]>([]);
  const [loadingBubbleCentroCusto, setLoadingBubbleCentroCusto] = useState(false);
  const [loadingSupabaseCentroCusto, setLoadingSupabaseCentroCusto] = useState(false);

  // Centro Custo Filter/Search states
  const [searchBubbleCentroCusto, setSearchBubbleCentroCusto] = useState('');
  const [searchSupabaseCentroCusto, setSearchSupabaseCentroCusto] = useState('');

  // Forma Pagamento Data states
  const [bubbleFormaPagamento, setBubbleFormaPagamento] = useState<FormaPagamento[]>([]);
  const [supabaseFormaPagamento, setSupabaseFormaPagamento] = useState<FormaPagamento[]>([]);
  const [loadingBubbleFormaPagamento, setLoadingBubbleFormaPagamento] = useState(false);
  const [loadingSupabaseFormaPagamento, setLoadingSupabaseFormaPagamento] = useState(false);

  // Forma Pagamento Filter/Search states
  const [searchBubbleFormaPagamento, setSearchBubbleFormaPagamento] = useState('');
  const [searchSupabaseFormaPagamento, setSearchSupabaseFormaPagamento] = useState('');

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

  const [periodoInicioDespesas, setPeriodoInicioDespesas] = useState('');
  const [periodoFimDespesas, setPeriodoFimDespesas] = useState('');

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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all relative overflow-hidden group ${
              currentTab === 'dashboard'
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
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                ['entradas', 'despesas', 'mensalistas'].includes(currentTab)
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
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                      currentTab === 'entradas'
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
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                      currentTab === 'despesas'
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
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                      currentTab === 'mensalistas'
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
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                ['pessoas', 'veiculos', 'formapagamento', 'centrocusto'].includes(currentTab)
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
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                      currentTab === 'pessoas'
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
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                      currentTab === 'veiculos'
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
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                      currentTab === 'formapagamento'
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
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                      currentTab === 'centrocusto'
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all relative overflow-hidden group ${
              currentTab === 'ordemservico'
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all relative overflow-hidden group ${
              currentTab === 'laudo'
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
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                currentTab === 'migracoes'
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
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                      currentTab === 'migracoes'
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
                LAVADO PRO
              </span>
              <p className="text-xxs text-[#94a3b8] light-theme:text-slate-200/90 leading-relaxed">
                Acesse fluxos avançados n8n e exportação em massa.
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

    const getBezierPath = (coords: {x: number, y: number}[]) => {
      let path = `M ${coords[0].x} ${coords[0].y}`;
      for (let i = 0; i < coords.length - 1; i++) {
        const cp1x = coords[i].x + 40;
        const cp1y = coords[i].y;
        const cp2x = coords[i+1].x - 40;
        const cp2y = coords[i+1].y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${coords[i+1].x} ${coords[i+1].y}`;
      }
      return path;
    };

    const pathEntradas = getBezierPath(coordsEntradas);
    const pathDespesas = getBezierPath(coordsDespesas);

    const fillEntradas = `${pathEntradas} L ${coordsEntradas[coordsEntradas.length-1].x} 170 L ${coordsEntradas[0].x} 170 Z`;
    const fillDespesas = `${pathDespesas} L ${coordsDespesas[coordsDespesas.length-1].x} 170 L ${coordsDespesas[0].x} 170 Z`;

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
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            item.type === 'entrada'
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
    const totalEntradasVal = supabaseEntradas.reduce((acc, curr) => acc + (curr.valor || 0), 0);
    return (
      <div className="h-full flex flex-col gap-4 w-full">
        {/* Aggregated Finance Stats header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">TOTAL ENTRADAS</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalEntradasVal)}
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Plus className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">QUANTIDADE</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">{supabaseEntradas.length} Lançamentos</h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0">
              <Car className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">MÉDIA POR LANÇAMENTO</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(supabaseEntradas.length > 0 ? (totalEntradasVal / supabaseEntradas.length) : 0)}
              </h4>
            </div>
          </div>
        </div>

        {/* Content Box */}
        <div className="flex-1 bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Tabela de Receitas</h3>
            
            <div className="flex items-center gap-3 flex-wrap">
              {/* Filtro por Período */}
              <div className="flex items-center gap-2 bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#94a3b8] light-theme:text-slate-600">
                <span className="font-semibold text-[10px] uppercase tracking-wider text-[#64748b]">Período:</span>
                <input
                  type="date"
                  value={periodoInicioEntradas}
                  onChange={e => setPeriodoInicioEntradas(e.target.value)}
                  className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-[11px]"
                />
                <span className="text-[#64748b] px-0.5">até</span>
                <input
                  type="date"
                  value={periodoFimEntradas}
                  onChange={e => setPeriodoFimEntradas(e.target.value)}
                  className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-[11px]"
                />
                {(periodoInicioEntradas || periodoFimEntradas) && (
                  <button
                    onClick={() => {
                      setPeriodoInicioEntradas('');
                      setPeriodoFimEntradas('');
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
                  onChange={e => setSearchSupabaseEntradas(e.target.value)}
                  className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {supabaseEntradas.length === 0 ? (
              <div className="h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
                <Database className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
                <span className="text-xs">Nenhuma receita registrada no Supabase</span>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1f2433] light-theme:border-slate-100 text-[10px] text-[#64748b] uppercase tracking-wider font-bold">
                    <th className="pb-3">Descrição da Entrada</th>
                    <th className="pb-3">Cliente / Proprietário</th>
                    <th className="pb-3">Placa Veículo</th>
                    <th className="pb-3">Forma Pagamento</th>
                    <th className="pb-3">Data</th>
                    <th className="pb-3 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                  {filteredSupabaseEntradas.map(item => (
                    <tr key={item.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 font-semibold text-white light-theme:text-slate-800">{item.descricao_entrada || 'Serviço Lavatório'}</td>
                      <td className="py-3.5 font-medium text-slate-300 light-theme:text-slate-500">{item.nome_pessoa || 'Balcão/Avulso'}</td>
                      <td className="py-3.5 font-mono font-bold uppercase tracking-wider text-cyan-400">{item.placa_veiculo || 'N/A'}</td>
                      <td className="py-3.5 font-medium">{item.descricao_forma_pagamento || 'N/A'}</td>
                      <td className="py-3.5 font-medium text-[#64748b]">{item.data_entrada ? new Date(item.data_entrada).toLocaleDateString('pt-BR') : 'N/A'}</td>
                      <td className="py-3.5 text-right font-bold text-emerald-400">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDespesas = () => {
    return (
      <div className="h-full flex flex-col gap-4 w-full">
        {/* Finance Stats header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 flex-shrink-0">
              <TrendingDown className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">TOTAL CUSTOS EFETUADOS</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(supabaseDespesas.reduce((acc, curr) => acc + (curr.valor || 0), 0))}
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 flex-shrink-0">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">TOTAL PROVISÕES</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(supabaseDespesas.reduce((acc, curr) => acc + (curr.valor_provisao || 0), 0))}
              </h4>
            </div>
          </div>
          <div className="bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-4 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] font-bold block leading-none">QUANTIDADE CUSTOS</span>
              <h4 className="text-sm font-bold text-white light-theme:text-slate-800 mt-1 leading-none">{supabaseDespesas.length} Despesas</h4>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Tabela de Despesas</h3>
            
            <div className="flex items-center gap-3 flex-wrap">
              {/* Filtro por Período */}
              <div className="flex items-center gap-2 bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#94a3b8] light-theme:text-slate-600">
                <span className="font-semibold text-[10px] uppercase tracking-wider text-[#64748b]">Período:</span>
                <input
                  type="date"
                  value={periodoInicioDespesas}
                  onChange={e => setPeriodoInicioDespesas(e.target.value)}
                  className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-[11px]"
                />
                <span className="text-[#64748b] px-0.5">até</span>
                <input
                  type="date"
                  value={periodoFimDespesas}
                  onChange={e => setPeriodoFimDespesas(e.target.value)}
                  className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-[11px]"
                />
                {(periodoInicioDespesas || periodoFimDespesas) && (
                  <button
                    onClick={() => {
                      setPeriodoInicioDespesas('');
                      setPeriodoFimDespesas('');
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
                  onChange={e => setSearchSupabaseDespesas(e.target.value)}
                  className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {supabaseDespesas.length === 0 ? (
              <div className="h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
                <Database className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
                <span className="text-xs">Nenhuma despesa registrada no Supabase</span>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1f2433] light-theme:border-slate-100 text-[10px] text-[#64748b] uppercase tracking-wider font-bold">
                    <th className="pb-3">Centro de Custo</th>
                    <th className="pb-3">Forma Pagamento</th>
                    <th className="pb-3">Data</th>
                    <th className="pb-3 text-right">Valor Provisão</th>
                    <th className="pb-3 text-right">Valor Efetuado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                  {filteredSupabaseDespesas.map(item => (
                    <tr key={item.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 font-semibold text-white light-theme:text-slate-800">{item.nome_centro_custos || 'Operacional Geral'}</td>
                      <td className="py-3.5 font-medium">{item.descricao_forma_pagamento || 'N/A'}</td>
                      <td className="py-3.5 font-medium text-[#64748b]">{item.data_despesa ? new Date(item.data_despesa).toLocaleDateString('pt-BR') : 'N/A'}</td>
                      <td className="py-3.5 text-right font-medium text-yellow-500">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_provisao || 0)}
                      </td>
                      <td className="py-3.5 text-right font-bold text-rose-400">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMensalistas = () => {
    const totalVipRevenue = supabaseMensalistas.reduce((acc, curr) => acc + (curr.valor_original || 0), 0);
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
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Gestão de Mensalistas</h3>
            
            <div className="flex items-center gap-3 flex-wrap">
              {/* Filtro por Período */}
              <div className="flex items-center gap-2 bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#94a3b8] light-theme:text-slate-600">
                <span className="font-semibold text-[10px] uppercase tracking-wider text-[#64748b]">Cadastro:</span>
                <input
                  type="date"
                  value={periodoInicioMensalistas}
                  onChange={e => setPeriodoInicioMensalistas(e.target.value)}
                  className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-[11px]"
                />
                <span className="text-[#64748b] px-0.5">até</span>
                <input
                  type="date"
                  value={periodoFimMensalistas}
                  onChange={e => setPeriodoFimMensalistas(e.target.value)}
                  className="bg-transparent border-none text-white light-theme:text-slate-800 focus:outline-none text-[11px]"
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
                    <th className="pb-3">Nome / Proprietário</th>
                    <th className="pb-3">Plano</th>
                    <th className="pb-3">Veículo / Placa</th>
                    <th className="pb-3 text-center">Dia Vencimento</th>
                    <th className="pb-3 text-right">Valor Mensalidade</th>
                    <th className="pb-3 text-center">Data Cadastro</th>
                    <th className="pb-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                  {filteredSupabaseMensalistas.map(item => (
                    <tr key={item.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 font-semibold text-white light-theme:text-slate-800 flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-violet-600/10 text-violet-400 flex items-center justify-center font-bold text-xxs flex-shrink-0">
                          {item.nome_pessoa ? item.nome_pessoa.slice(0, 2).toUpperCase() : 'ME'}
                        </div>
                        <span>{item.nome_pessoa}</span>
                      </td>
                      <td className="py-3.5 font-medium text-slate-300 light-theme:text-slate-500">{item.plano || 'VIP Basic'}</td>
                      <td className="py-3.5 font-medium">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-white/5 light-theme:bg-slate-100 border border-white/10 light-theme:border-slate-200 text-cyan-400 light-theme:text-blue-500 uppercase tracking-wide text-[10px]">
                            {item.placa || 'N/A'}
                          </span>
                          <span className="text-[10px] text-[#64748b] truncate max-w-[120px]">{item.marca_modelo}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-center font-bold">Dia {item.dia_vencimento || 'N/A'}</td>
                      <td className="py-3.5 text-right font-bold text-white light-theme:text-slate-800">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_original || 0)}
                      </td>
                      <td className="py-3.5 text-center font-medium text-[#64748b]">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                      </td>
                      <td className="py-3.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          item.ativo
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}>
                          {item.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPessoas = () => {
    return (
      <div className="h-full flex flex-col gap-4 w-full">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
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
                {supabaseData.filter(p => p.ativo).length} de {supabaseData.length} Contatos
              </h4>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Diretório de Clientes e Pessoas (Supabase)</h3>
            
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por nome, CPF ou WhatsApp..."
                value={searchSupabase}
                onChange={e => setSearchSupabase(e.target.value)}
                className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {supabaseData.length === 0 ? (
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
                    <th className="pb-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                  {filteredSupabase.map(item => (
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
                        <a href={`https://wa.me/${(item.celular_whatsapp || '').replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                          {item.celular_whatsapp || 'Sem Contato'}
                        </a>
                      </td>
                      <td className="py-3.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          item.ativo
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}>
                          {item.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderVeiculos = () => {
    return (
      <div className="h-full flex flex-col gap-4 w-full">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
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

        <div className="flex-1 bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h3 className="text-sm font-bold text-white light-theme:text-slate-800">Listagem de Veículos (Supabase)</h3>
            
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por placa, modelo ou dono..."
                value={searchSupabaseVehicles}
                onChange={e => setSearchSupabaseVehicles(e.target.value)}
                className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {supabaseVehicles.length === 0 ? (
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2433]/40 light-theme:divide-slate-100">
                  {filteredSupabaseVehicles.map(item => (
                    <tr key={item.id} className="text-xs text-[#94a3b8] light-theme:text-slate-600 hover:bg-white/5 light-theme:hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 font-semibold">
                        <span className="px-2 py-0.5 rounded font-mono font-bold bg-[#161924] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-300 text-cyan-400 light-theme:text-blue-600 uppercase tracking-wide">
                          {item.placa}
                        </span>
                      </td>
                      <td className="py-3.5 font-bold text-white light-theme:text-slate-800">{item.marca_modelo}</td>
                      <td className="py-3.5 font-medium text-slate-300 light-theme:text-slate-500 capitalize">{item.tipo || 'Passeio'}</td>
                      <td className="py-3.5 font-medium">{item.pessoa_nome || 'N/A'}</td>
                      <td className="py-3.5 font-medium text-[#64748b]">
                        {item.motorista && item.motorista.length > 0 ? (Array.isArray(item.motorista) ? item.motorista.join(', ') : item.motorista) : 'Proprietário'}
                      </td>
                      <td className="py-3.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          item.ativo
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}>
                          {item.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFormaPagamento = () => {
    return (
      <div className="h-full bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden w-full">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-bold text-white light-theme:text-slate-800 leading-none">Formas de Pagamento (Supabase)</h3>
            <p className="text-[10px] text-[#64748b] mt-1.5 leading-none">Métodos ativos configurados para o fluxo financeiro.</p>
          </div>
          
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar formas de pagamento..."
              value={searchSupabaseFormaPagamento}
              onChange={e => setSearchSupabaseFormaPagamento(e.target.value)}
              className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar w-full">
          {filteredSupabaseFormaPagamento.length === 0 ? (
            <div className="col-span-3 h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
              <Wallet className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
              <span className="text-xs">Nenhuma forma de pagamento registrada</span>
            </div>
          ) : (
            filteredSupabaseFormaPagamento.map(item => (
              <div key={item.id} className="p-5 rounded-2xl bg-[#090b11]/55 light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 flex flex-col justify-between h-36 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 h-10 w-10 bg-violet-600/5 rounded-tl-3xl pointer-events-none group-hover:scale-150 transition-transform" />
                
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white light-theme:text-slate-800 text-xs leading-none">{item.descricao}</h4>
                      <span className="text-[10px] text-[#64748b] font-medium block mt-1.5 leading-none">Tipo: {item.tipo_transacao}</span>
                    </div>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                </div>

                <div className="flex items-center justify-between mt-auto border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-3">
                  <span className="text-[9px] text-[#64748b] font-bold uppercase tracking-wider leading-none">ID no Banco</span>
                  <span className="font-mono text-[9px] text-[#94a3b8] leading-none">{item.id.slice(0, 15)}...</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderCentroCusto = () => {
    return (
      <div className="h-full bg-[#0e111a] light-theme:bg-white border border-[#1f2433] light-theme:border-slate-200 p-6 rounded-2xl flex flex-col overflow-hidden w-full">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-bold text-white light-theme:text-slate-800 leading-none">Centro de Custos / Categorias</h3>
            <p className="text-[10px] text-[#64748b] mt-1.5 leading-none">Agrupadores de despesas e receitas para análise fiscal.</p>
          </div>
          
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748b] pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar centro de custos..."
              value={searchSupabaseCentroCusto}
              onChange={e => setSearchSupabaseCentroCusto(e.target.value)}
              className="w-full bg-[#090b11] light-theme:bg-slate-100 border border-[#1f2433] light-theme:border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-white light-theme:text-slate-800 placeholder-[#64748b] focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar w-full">
          {filteredSupabaseCentroCusto.length === 0 ? (
            <div className="col-span-2 h-60 flex flex-col items-center justify-center text-[#64748b] gap-2">
              <Layers className="h-8 w-8 text-[#64748b]/40 animate-pulse" />
              <span className="text-xs">Nenhum centro de custo registrado</span>
            </div>
          ) : (
            filteredSupabaseCentroCusto.map(item => (
              <div key={item.id} className="p-5 rounded-2xl bg-[#090b11]/55 light-theme:bg-slate-50 border border-[#1f2433] light-theme:border-slate-200 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 h-10 w-10 bg-cyan-600/5 rounded-tl-3xl pointer-events-none group-hover:scale-150 transition-transform" />
                
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-cyan-600/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white light-theme:text-slate-800 text-xs leading-none">{item.nome_centro_custo}</h4>
                      <p className="text-xxs text-[#64748b] mt-1.5 leading-relaxed">{item.descricao || 'Operação e faturamento'}</p>
                    </div>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} />
                </div>

                <div className="grid grid-cols-3 gap-3 border-t border-[#1f2433]/40 light-theme:border-slate-100 pt-3 text-[10px] font-bold text-[#64748b]">
                  <div>
                    <span className="block text-[8px] text-[#64748b]/60 uppercase tracking-widest leading-none">Recorrência</span>
                    <span className="text-white light-theme:text-slate-700 font-medium block mt-1.5 leading-none">{item.tipo_recorrencia || 'Semestral'}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-[#64748b]/60 uppercase tracking-widest leading-none">Movimento</span>
                    <span className="text-white light-theme:text-slate-700 font-medium block mt-1.5 leading-none">{item.tipo_movimentacao || 'Lançamento'}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] text-[#64748b]/60 uppercase tracking-widest leading-none">Provisão</span>
                    <span className="text-cyan-400 font-bold block mt-1.5 leading-none">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_provisao || 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
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
    (item.cnpj || '').includes(searchSupabase)
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
    if (periodoInicioDespesas || periodoFimDespesas) {
      const itemDateStr = item.data_despesa ? item.data_despesa.split('T')[0] : '';
      if (!itemDateStr) return false;
      if (periodoInicioDespesas && itemDateStr < periodoInicioDespesas) return false;
      if (periodoFimDespesas && itemDateStr > periodoFimDespesas) return false;
    }
    return true;
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
    if (periodoInicioEntradas || periodoFimEntradas) {
      const itemDateStr = item.data_entrada ? item.data_entrada.split('T')[0] : '';
      if (!itemDateStr) return false;
      if (periodoInicioEntradas && itemDateStr < periodoInicioEntradas) return false;
      if (periodoFimEntradas && itemDateStr > periodoFimEntradas) return false;
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
                  filteredBubbleCentroCusto.map(item => (
                    <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/20 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                            {item.nome_centro_custo}
                          </h4>
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
                        <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                      </div>
                    </div>
                  ))
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
                  filteredSupabaseCentroCusto.map(item => (
                    <div key={item.id} className="p-3.5 rounded-xl bg-palette-deep/60 border border-palette-medium/30 hover:border-palette-medium/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-lg bg-palette-medium/10 border border-palette-medium/25 text-palette-light flex items-center justify-center mt-0.5 group-hover:bg-palette-medium/20 transition-colors">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-palette-light text-sm group-hover:text-palette-light/95 transition-colors">
                            {item.nome_centro_custo}
                          </h4>
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
                        <span className={`h-2 w-2 rounded-full ${item.ativo ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.ativo ? 'Ativo' : 'Inativo'} />
                      </div>
                    </div>
                  ))
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