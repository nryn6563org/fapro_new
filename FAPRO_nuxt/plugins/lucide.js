import Vue from 'vue'
import { 
  Search, 
  Moon, 
  Sun, 
  Settings, 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Zap, 
  PieChart, 
  LineChart, 
  Users, 
  MessageCircle, 
  Calendar, 
  Star, 
  LogOut, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  AlertCircle,
  BookOpen, // Sidebar (Investment Info)
  CreditCard, // Sidebar (Payment)
  User, // Sidebar (My Info)
  Monitor, // Header (System Theme)
  TrendingUp, // QuantCard
  Shield, // QuantCard
  Sparkles, // Customer List (AI Search)
  Upload, // Customer List (Excel)
  Download, // Customer List (Excel)
  UserPlus // Customer List (Add Customer)
} from 'lucide-vue'

const icons = { 
  Search, 
  Moon, 
  Sun, 
  Settings, 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Zap, 
  PieChart, 
  LineChart, 
  Users, 
  MessageCircle, 
  Calendar, 
  Star, 
  LogOut, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  AlertCircle,
  BookOpen,
  CreditCard,
  User,
  Monitor,
  TrendingUp,
  Shield,
  Sparkles,
  Upload,
  Download,
  UserPlus
}

Object.entries(icons).forEach(([name, icon]) => {
  Vue.component(name, icon)
})
