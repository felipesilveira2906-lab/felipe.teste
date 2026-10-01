import React from "react";
import { ASSETS, VehicleData } from "../data/vehicles";

export type TabId = "inicio" | "rotas" | "garagem" | "financas" | "servicos";

interface HeaderProps {
  activeTab: TabId;
  activeVehicle: VehicleData;
  onToggleVehicle: () => void;
  onTriggerSos: () => void;
  onOpenProfile: () => void;
}

const TAB_LABELS: Record<TabId, string> = {
  inicio: "Início",
  rotas: "Rotas",
  garagem: "Início",
  financas: "Finanças",
  servicos: "Serviços",
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  activeVehicle,
  onToggleVehicle,
  onTriggerSos,
  onOpenProfile,
}) => {
  const isRoutes = activeTab === "rotas";

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
      <div className="h-16 px-gutter flex items-center justify-between gap-space-sm">
        {/* Zone 1: Brand Logo & Title */}
        <div className="flex items-center gap-space-sm min-w-0 flex-shrink-0">
          <img
            alt="MotorHelp Logo"
            className="h-8 w-auto object-contain"
            src={ASSETS.logo}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-title-md text-title-md text-on-surface leading-none tracking-tight">
              MotorHelp
            </span>
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase mt-0.5">
              {TAB_LABELS[activeTab]}
            </span>
          </div>
        </div>

        {/* Zone 2: Active Vehicle Switcher */}
        <div
          className={`flex-1 flex justify-center ${
            isRoutes ? "max-w-[190px]" : "max-w-[210px]"
          } min-w-0 mx-space-xs`}
        >
          <button
            onClick={onToggleVehicle}
            className="w-full h-11 px-2.5 py-1 bg-surface-container-high/90 hover:bg-surface-container-highest rounded-lg flex items-center justify-between gap-1.5 transition-colors cursor-pointer"
            type="button"
            title="Alternar veículo ativo"
          >
            <div className="flex items-center gap-1.5 min-w-0 overflow-hidden text-left">
              <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0">
                {activeVehicle.type === "moto" ? "two_wheeler" : "directions_car"}
              </span>
              <div className="truncate">
                <span className="block font-label-md text-label-md text-on-surface truncate">
                  {activeVehicle.fullName}
                </span>
                <span className="block font-label-sm text-label-sm text-on-surface-variant font-telemetry-md truncate">
                  {activeVehicle.plate}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px] flex-shrink-0">
              expand_more
            </span>
          </button>
        </div>

        {/* Zone 3: Status / SOS & Profile */}
        <div className="flex items-center gap-space-xs flex-shrink-0">
          {isRoutes ? (
            <button
              onClick={onTriggerSos}
              aria-label="Emergência SOS"
              className="min-h-[44px] min-w-[44px] px-2.5 h-10 rounded-lg bg-error-container text-on-error flex items-center justify-center gap-1 shadow-[0_0_16px_rgba(239,68,68,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-error">
                sos
              </span>
            </button>
          ) : (
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-low"
              title="GPS Online"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
            </div>
          )}

          <button
            onClick={onOpenProfile}
            aria-label="Perfil do Usuário"
            className="w-11 h-11 flex items-center justify-center rounded-full cursor-pointer"
            type="button"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={ASSETS.profile}
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
