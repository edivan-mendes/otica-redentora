/* =============================================================
   Ótica Redentora — Camada de dados (Supabase)
   Se ainda não estiver configurado (supabase.config.js vazio),
   o app segue funcionando em modo demonstração.
   ============================================================= */
(function(){
  const cfg = window.SUPABASE_CONFIG || {};
  const lib = window.supabase; // UMD global de @supabase/supabase-js
  const SB  = (lib && cfg.url && cfg.anonKey) ? lib.createClient(cfg.url, cfg.anonKey) : null;

  const notReady = { error:{ message:'Banco de dados ainda não configurado.' } };

  const DB = {
    client: SB,
    ready(){ return !!SB; },

    /* -------- CRUD genérico -------- */
    async list(table, {order='created_at', asc=false}={}){
      if(!SB) return { data:[], error:null };
      const { data, error } = await SB.from(table).select('*').order(order,{ascending:asc});
      return { data:data||[], error };
    },
    async get(table, id){
      if(!SB) return { data:null, ...notReady };
      return await SB.from(table).select('*').eq('id',id).single();
    },
    async create(table, row){
      if(!SB) return notReady;
      return await SB.from(table).insert(row).select().single();
    },
    async update(table, id, patch){
      if(!SB) return notReady;
      return await SB.from(table).update({ ...patch, updated_at:new Date().toISOString() }).eq('id',id).select().single();
    },
    async remove(table, id){
      if(!SB) return notReady;
      return await SB.from(table).delete().eq('id',id);
    },
    async count(table){
      if(!SB) return 0;
      const { count } = await SB.from(table).select('*',{count:'exact',head:true});
      return count||0;
    },

    /* -------- Autenticação -------- */
    auth:{
      async signIn(email,password){ if(!SB) return notReady; return await SB.auth.signInWithPassword({email,password}); },
      async signUp(email,password){ if(!SB) return notReady; return await SB.auth.signUp({email,password}); },
      async signOut(){ if(SB) await SB.auth.signOut(); },
      async session(){ if(!SB) return null; const { data } = await SB.auth.getSession(); return data.session; },
      async user(){ if(!SB) return null; const { data } = await SB.auth.getUser(); return data.user; },
      onChange(cb){ if(SB) SB.auth.onAuthStateChange((_e,s)=>cb(s)); }
    }
  };

  window.DB = DB;
})();
