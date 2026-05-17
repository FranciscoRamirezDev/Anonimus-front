"use client";

import React, { useState, useEffect } from "react";

const AVATAR_POOL = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAYsND-BnzxoQw4y4g31iiwdsWoY0VWtH7eft9LDPsXk9F-HJqGiOBqRM-N6IgrHIz9yzH6D-hTtu0uVWuwWXX5aLeHOed10TRQKlz4sEusojtB9gzjWQFZf2uiJBoN1hDP9timpOAop6_nr6cpuJ7f54lMijU9SUAx73ETjU1J88PFC5F4lJFhFkNlqfvaOggxlNSVWjCqmwh7T5-6SG5_DcF-pR2_Cis4I2l853VH-TRNiNIYpISF0mGtzzFgNYhTFgiCt2sQ1_M",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAduSSwb5vF-JBX05ng0oNXrrYdh7hLDK-7ZPKs6jQ3V4ry5Lqqi4_u86OpW7GH5nrtGIWPrbvZ7KIKqWzxxXMNWO0otH9-vb7p_Y1G13NAjBFtWpFdeD0ZfHtnGo-9NYBoOpT0nTbqPhSzoYps8vDp9zbVyV5dgsb-Y_40b47d8bzLkU93FoDmxAC57f3ochDhAp67eJtCQtO_GzoFc16PLXQLqvy_yZo_kWDQKSBimnwRUB-ytWzLoA5OVsXaj6Ke5uyuBOgLqMY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAMudVB7_fsVO8alWV0NOe92MkUO9BA6xSg6CVzHeZaSwZHH37XqZFlunuGPTFokUhqowN1N7RkrYfTTkUGKSux1fknmsQ4cYrVLfqN3CM61snBdbXu3wD4cLK3Xe-2XzIeuLqyd_gzSl2p2cY1Eh3f75dvTgodpZQMI0uVvtZ1w8e9STbA0ooF3LKkxRGFQzTrDQEG_j7wv6rFk2PAyEwaR8tN_NIxiJlMASQCwfynUioea9z-H_ZuyfJ9mHzR8PsF6YOJB5ZW0Ho",
];

const RANDOM_ALIASES = [
  "CaminanteSilencioso",
  "AlmaLibre",
  "FuerzaInterior",
  "LuzDeEsperanza",
  "MenteEnCalma",
  "CorazonFuerte",
  "BuscadorDePaz",
  "EspirituValiente",
  "NuevoAmanecer",
  "ResilienciaActiva",
  "PazInterior",
  "BrilloSereno",
  "VientoSuave",
  "SolDeOtoño",
];

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [avatars, setAvatars] = useState(AVATAR_POOL);
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState<number>(0);
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [commitment, setCommitment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({
    message: "",
    type: null,
  });

  // Effect to clear toast after 4s
  useEffect(() => {
    if (toast.type) {
      const timer = setTimeout(() => {
        setToast({ message: "", type: null });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleShuffleAvatars = () => {
    // Shuffle the three avatars visually and pick a new selected one
    const shuffled = [...avatars].sort(() => Math.random() - 0.5);
    setAvatars(shuffled);
    // Select a random one
    setSelectedAvatarIdx(Math.floor(Math.random() * 3));
    showToast("¡Avatares barajados con éxito!", "success");
  };

  const handleGenerateAlias = () => {
    const randomIdx = Math.floor(Math.random() * RANDOM_ALIASES.length);
    const generated = RANDOM_ALIASES[randomIdx] + Math.floor(Math.random() * 100);
    setAlias(generated);
    showToast(`Alias aleatorio generado: ${generated}`, "success");
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!alias.trim()) {
      showToast("Por favor, introduce un alias o apodo.", "error");
      return;
    }
    
    if (password.length < 8) {
      showToast("La contraseña debe tener al menos 8 caracteres.", "error");
      return;
    }
    
    if (activeTab === "register" && !commitment) {
      showToast("Debes comprometerte con el acuerdo ético de respeto.", "error");
      return;
    }

    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      if (activeTab === "register") {
        showToast("¡Registro exitoso! Bienvenido a Caminos de Apoyo.", "success");
      } else {
        showToast("¡Inicio de sesión exitoso! Bienvenido de vuelta.", "success");
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full font-body text-on-surface antialiased overflow-x-hidden">
      <div className="blob-1"></div>
      <div className="blob-2"></div>

      {/* Persistent top header */}
      <header className="fixed top-0 w-full z-50 bg-[#f7f9fc]/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-screen-xl mx-auto">
          <div className="text-2xl font-bold text-[#8E94F2] font-headline tracking-tight">
            Sanctuary
          </div>
          <button 
            type="button"
            onClick={() => showToast("Caminos de Apoyo es un espacio seguro y anónimo de salud mental y acompañamiento.", "success")}
            className="text-[#8E94F2] hover:opacity-80 transition-opacity scale-95 duration-300 ease-out cursor-pointer flex items-center justify-center p-2 rounded-full hover:bg-[#8E94F2]/10"
          >
            <span className="material-symbols-outlined text-2xl">help_outline</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-24 pb-12 px-6 flex flex-col items-center justify-center min-h-screen max-w-2xl mx-auto relative z-10">
        {/* Animated Toast Notification */}
        {toast.type && (
          <div 
            className={`fixed top-20 right-6 left-6 md:left-auto md:w-96 z-50 p-4 rounded-xl shadow-lg border backdrop-blur-md transform translate-y-0 transition-all duration-300 flex items-center gap-3 ${
              toast.type === "success" 
                ? "bg-emerald-500/25 border-emerald-500/50 text-emerald-950" 
                : "bg-error-container/20 border-error-container/50 text-on-error-container"
            }`}
          >
            <span className="material-symbols-outlined shrink-0 text-2xl">
              {toast.type === "success" ? "check_circle" : "error"}
            </span>
            <p className="text-sm font-semibold leading-snug">{toast.message}</p>
          </div>
        )}

        {/* Main Card with Glassmorphism */}
        <div className="w-full glass-panel rounded-xl shadow-[0px_20px_40px_rgba(45,51,56,0.06)] border border-outline-variant/15 p-6 md:p-10 transition-all duration-300">
          <div className="text-center mb-6">
            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface mb-2 tracking-tight">
              Bienvenido a tu espacio seguro
            </h1>
            <p className="text-on-surface-variant text-sm md:text-base">
              Un lugar para sanar, compartir y crecer juntos.
            </p>
          </div>

          {/* Tab Selector to toggle between Register and Login */}
          <div className="flex bg-surface-container-high rounded-full p-1 mb-6 shadow-inner max-w-sm mx-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                showToast("Cambiado a modo Registro", "success");
              }}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "register"
                  ? "bg-surface-container-lowest text-primary shadow-[0px_4px_10px_rgba(45,51,56,0.05)]"
                  : "text-on-surface-variant hover:text-on-surface font-medium"
              }`}
            >
              Registrarse
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                showToast("Cambiado a modo Inicio de Sesión", "success");
              }}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "login"
                  ? "bg-surface-container-lowest text-primary shadow-[0px_4px_10px_rgba(45,51,56,0.05)]"
                  : "text-on-surface-variant hover:text-on-surface font-medium"
              }`}
            >
              Iniciar Sesión
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Privacy info banner */}
            <div className="bg-primary-container/20 rounded-lg p-3 px-4 border border-primary-container/50 flex flex-row items-center gap-4 text-left transition-all duration-500 ease-in-out">
              <span 
                className="material-symbols-outlined text-primary text-2xl shrink-0" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                privacy_tip
              </span>
              <div>
                <p className="font-headline text-sm font-bold text-on-surface">
                  Solo tú sabes quién eres.
                </p>
                <p className="text-xs text-on-surface-variant leading-tight">
                  Tu privacidad es sagrada en Caminos de Apoyo.
                </p>
              </div>
            </div>

            {/* Anonymous avatar selection (Only for registration mode) */}
            <div 
              className={`space-y-3 transition-all duration-300 ${
                activeTab === "register" 
                  ? "opacity-100 max-h-40 overflow-visible" 
                  : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
              }`}
            >
              <label className="block text-sm font-semibold text-on-surface text-center">
                Elige tu avatar anónimo
              </label>
              <div className="flex justify-center items-center gap-4">
                {avatars.map((avatarUrl, idx) => {
                  const isSelected = selectedAvatarIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedAvatarIdx(idx);
                        showToast(`Avatar ${idx + 1} seleccionado`, "success");
                      }}
                      className={`rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm relative overflow-hidden transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? "w-14 h-14 border-2 border-primary scale-105 opacity-100" 
                          : "w-12 h-12 border border-outline-variant/30 opacity-70 hover:opacity-100 hover:scale-105 hover:border-primary/50"
                      }`}
                      type="button"
                    >
                      <img 
                        alt={`Avatar ${idx + 1}`} 
                        className="w-full h-full object-cover" 
                        src={avatarUrl} 
                      />
                    </button>
                  );
                })}
                <button
                  onClick={handleShuffleAvatars}
                  className="w-10 h-10 rounded-full bg-surface-container-low border border-dashed border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                  type="button"
                  title="Mezclar avatares"
                >
                  <span className="material-symbols-outlined text-[18px]">shuffle</span>
                </button>
              </div>
            </div>

            {/* Input fields (Alias and Password) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              <div className="relative">
                <label className="block text-sm font-semibold text-on-surface mb-2 ml-1">
                  Alias / Apodo
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-on-surface-variant pointer-events-none">
                    face
                  </span>
                  <input
                    id="alias-input"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    className="w-full bg-surface-container-lowest border-0 rounded-full py-4 pl-12 pr-14 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/50 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.02)] transition-all outline-none"
                    placeholder="Ej. CaminanteSilencioso"
                    type="text"
                  />
                  <button
                    onClick={handleGenerateAlias}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary-container/30 rounded-full transition-colors group cursor-pointer"
                    title="Generar alias aleatorio"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl group-hover:rotate-180 transition-transform duration-500">
                      casino
                    </span>
                  </button>
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-on-surface mb-2 ml-1">
                  Contraseña
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-on-surface-variant pointer-events-none">
                    lock
                  </span>
                  <input
                    id="password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-lowest border-0 rounded-full py-4 pl-12 pr-12 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/50 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.02)] transition-all outline-none"
                    placeholder="Mínimo 8 caracteres"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-on-surface-variant hover:text-on-surface rounded-full transition-colors cursor-pointer"
                    type="button"
                    title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Ethical commitment checkbox (Only for registration mode) */}
            <div 
              className={`flex items-start gap-3 px-1 pt-1 transition-all duration-300 ${
                activeTab === "register" 
                  ? "opacity-100 max-h-24 overflow-visible" 
                  : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
              }`}
            >
              <div className="flex items-center h-6">
                <input
                  id="commitment"
                  checked={commitment}
                  onChange={(e) => setCommitment(e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/50 bg-surface-container-lowest cursor-pointer transition-all mt-0.5"
                  type="checkbox"
                />
              </div>
              <label 
                className="text-xs text-on-surface-variant leading-tight cursor-pointer select-none" 
                htmlFor="commitment"
              >
                Me comprometo a mantener un ambiente de respeto, apoyando a otros y evitando juzgar las situaciones compartidas en la comunidad.
              </label>
            </div>

            {/* Main Submit Action Button */}
            <button
              id="submit-btn"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-primary-dim text-white font-headline font-bold text-base py-3.5 rounded-full shadow-[0px_8px_15px_rgba(112,73,179,0.2)] hover:shadow-[0px_12px_20px_rgba(112,73,179,0.3)] hover:scale-[1.02] disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group mt-4 cursor-pointer"
              type="submit"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    Cargando...
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </>
                ) : activeTab === "register" ? (
                  <>
                    Registrarse
                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                      person_add
                    </span>
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                      login
                    </span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity top-0 rounded-full"></div>
            </button>
          </form>
        </div>

        <p className="mt-8 text-sm text-on-surface-variant text-center max-w-xs opacity-70">
          Al registrarte, aceptas nuestros{" "}
          <a className="underline hover:text-primary transition-colors" href="#">
            Términos de Servicio
          </a>{" "}
          y{" "}
          <a className="underline hover:text-primary transition-colors" href="#">
            Política de Privacidad
          </a>
          .
        </p>
      </main>
    </div>
  );
}
