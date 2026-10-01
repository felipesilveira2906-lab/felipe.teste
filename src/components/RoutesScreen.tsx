import React, { useEffect, useState } from "react";
import { ASSETS } from "../data/vehicles";

interface RoutesScreenProps {
  onOpenFuelStops: () => void;
  onOpenCopilotModal: () => void;
  onTriggerSos: () => void;
  onFinishRoute: () => void;
}

export const RoutesScreen: React.FC<RoutesScreenProps> = ({
  onOpenFuelStops,
  onOpenCopilotModal,
  onTriggerSos,
  onFinishRoute,
}) => {
  const [speed, setSpeed] = useState<number>(64);
  const [isReportSheetOpen, setIsReportSheetOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [highContrastHud, setHighContrastHud] = useState<boolean>(false);
  const [gloveModeActive, setGloveModeActive] = useState<boolean>(true);
  const [is3DView, setIs3DView] = useState<boolean>(true);
  const [useAltRoute, setUseAltRoute] = useState<boolean>(false);
  const [userReportedToast, setUserReportedToast] = useState<string | null>(
    null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const jitter =
          (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.7 ? 1 : 0);
        return Math.min(68, Math.max(61, prev + jitter));
      });
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleReportHazard = (label: string) => {
    setIsReportSheetOpen(false);
    setUserReportedToast(label);
    setTimeout(() => {
      setUserReportedToast(null);
    }, 3500);
  };

  const overSpeed = speed - 60;

  return (
    <div className="flex flex-col w-full relative select-none">
      {/* Status & Quick Telemetry Glance Top Bar */}
      <div className="px-gutter pt-space-xs pb-space-sm flex items-center justify-between gap-space-sm bg-surface-container-lowest/90 backdrop-blur-md z-20">
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={() => setGloveModeActive((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
              gloveModeActive
                ? "bg-surface-container-high text-primary"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                gloveModeActive
                  ? "bg-primary animate-pulse"
                  : "bg-outline"
              }`}
            ></span>
            <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">
              {gloveModeActive ? "Modo Luva Ativo" : "Modo Padrão"}
            </span>
          </button>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-[15px] text-primary">
              satellite_alt
            </span>
            <span className="font-label-sm text-label-sm">RTK ±1.8m</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-on-surface">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              headset_mic
            </span>
            <span className="font-label-sm text-label-sm font-semibold">
              Cardo 94%
            </span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">
              thermostat
            </span>
            <span className="font-label-sm text-label-sm">24°C Seco</span>
          </div>
        </div>
      </div>

      {/* Primary Next Maneuver HUD Card */}
      <section className="px-gutter mb-space-sm relative z-20">
        <div className="w-full bg-surface-container-low rounded-xl p-space-md shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-container/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-start gap-space-md">
            {/* Turn Direction Symbol Box */}
            <div className="w-16 h-16 rounded-xl bg-primary-container text-on-primary-container flex flex-col items-center justify-center flex-shrink-0 shadow-lg">
              <span className="material-symbols-outlined text-[38px] font-bold">
                {useAltRoute ? "turn_slight_left" : "turn_right"}
              </span>
              <span className="font-label-sm text-label-sm -mt-1 font-bold">
                {useAltRoute ? "400m" : "250m"}
              </span>
            </div>
            {/* Maneuver Text & Road Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold">
                  {useAltRoute ? "Rota Alternativa • 400m" : "Próxima Saída • 250m"}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-surface-variant text-on-surface font-label-sm text-label-sm">
                  {useAltRoute ? "AV-23" : "SP-160"}
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface truncate font-bold mt-0.5 leading-tight">
                {useAltRoute ? "Av. Rubem Berta" : "Av. dos Bandeirantes"}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant truncate">
                {useAltRoute
                  ? "Corredor Norte-Sul / Parque Ibirapuera"
                  : "Sentido Aeroporto Congonhas / Marginal"}
              </p>
            </div>
          </div>

          {/* Lane Guidance Component */}
          <div className="mt-3 pt-2.5 bg-surface-container/60 rounded-lg px-space-sm py-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                Faixas:
              </span>
              <div className="flex items-center gap-1">
                <div className="w-7 h-7 rounded bg-surface-container-high/80 text-outline flex items-center justify-center opacity-40">
                  <span className="material-symbols-outlined text-[18px]">
                    straight
                  </span>
                </div>
                <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[18px]">
                    turn_slight_right
                  </span>
                </div>
                <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[18px]">
                    turn_right
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[16px]">
                navigation
              </span>
              <span className="font-label-sm text-label-sm font-semibold">
                Pista Central ou Direita
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Cockpit Map View Area */}
      <section className="relative w-full h-[380px] overflow-hidden bg-surface-container-lowest">
        {/* Map Background Rendering */}
        <img
          alt="Navegação Cockpit GPS MotorHelp 3D"
          className={`w-full h-full object-cover transition-all duration-300 ${
            highContrastHud
              ? "brightness-[0.95] contrast-[1.35]"
              : "brightness-[0.82] contrast-[1.12]"
          } ${is3DView ? "scale-100" : "scale-110"}`}
          src={ASSETS.cockpitMap}
          referrerPolicy="no-referrer"
        />
        {/* Gradient Vignette for Glance Ergonomics */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface-container-lowest/80 pointer-events-none"></div>

        {/* Floating HUD Overlay: Speedometer & Velocity Gauge */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          <div className="bg-surface-container-low/95 backdrop-blur-md rounded-xl p-3 shadow-2xl flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">
                Velocidade
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-telemetry-lg text-telemetry-lg text-on-surface font-extrabold tracking-tighter">
                  {speed}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                  km/h
                </span>
              </div>
            </div>
            {/* Road Speed Limit Badge */}
            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-surface-container-lowest shadow-inner relative">
              <div className="w-10 h-10 rounded-full bg-surface text-error flex flex-col items-center justify-center font-bold">
                <span className="font-telemetry-md text-[17px] leading-none text-error font-black">
                  60
                </span>
              </div>
            </div>
          </div>

          {/* Over-speed Micro Alert */}
          {overSpeed > 0 && (
            <div className="px-2.5 py-1 rounded-lg bg-secondary-container/90 text-on-secondary-container flex items-center gap-1.5 shadow-md w-max">
              <span className="material-symbols-outlined text-[15px] font-bold">
                warning
              </span>
              <span className="font-label-sm text-label-sm font-bold uppercase">
                +{overSpeed} km/h Limite
              </span>
            </div>
          )}
        </div>

        {/* Floating Map Markers & Waypoint Cards */}
        {/* Marker 1: Speed Camera / Radar Warning */}
        <div className="absolute top-16 right-4 z-10 flex items-center gap-2 bg-surface-container-high/95 backdrop-blur-md text-on-surface px-3 py-2 rounded-xl shadow-xl">
          <div className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[18px]">
              photo_camera
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-label-sm text-label-sm text-secondary font-bold">
              Radar Fixo 60 km/h
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              a 450 metros
            </span>
          </div>
        </div>

        {/* Marker 2: Road Hazard / Irregular Asphalt Alert */}
        <div className="absolute top-44 left-6 z-10 flex items-center gap-1.5 bg-surface-container-low/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-lg">
          <span className="material-symbols-outlined text-tertiary text-[18px]">
            report_problem
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-label-sm text-label-sm text-tertiary font-bold">
              {userReportedToast
                ? `${userReportedToast} Reportado`
                : "Buraco na Faixa 2"}
            </span>
            <span className="font-label-sm text-[9px] text-on-surface-variant mt-0.5">
              {userReportedToast ? "Enviado agora p/ rede" : "Reportado há 4m"}
            </span>
          </div>
        </div>

        {/* Marker 3: Cheap Fuel Station Opportunity */}
        <button
          type="button"
          onClick={onOpenFuelStops}
          className="absolute bottom-20 right-4 z-10 flex items-center gap-2 bg-surface-container-low/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl text-left cursor-pointer hover:bg-surface-container transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-surface-bright text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">
              local_gas_station
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-label-sm text-label-sm text-primary font-bold">
              Shell Box • R$ 5,59
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
              1.2 km adiante
            </span>
          </div>
        </button>

        {/* Center Bike Position Cursor & Heading Cone */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary-container/25 blur-md animate-ping absolute -top-4"></div>
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-primary mb-0.5 filter drop-shadow-[0_0_8px_rgba(77,142,255,0.8)]"></div>
          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-2xl">
            <span className="material-symbols-outlined text-[20px]">
              two_wheeler
            </span>
          </div>
        </div>

        {/* Map Re-center & Layers Quick Action */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => setSpeed(64)}
            aria-label="Recentrar Visão"
            className="w-12 h-12 rounded-xl bg-surface-container-high/95 text-on-surface flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px] text-primary">
              my_location
            </span>
          </button>
          <button
            onClick={() => setIs3DView((prev) => !prev)}
            aria-label="Visualização 3D/2D"
            className="w-12 h-12 rounded-xl bg-surface-container-high/95 text-on-surface flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                is3DView ? "text-on-surface" : "text-primary"
              }`}
            >
              view_in_ar
            </span>
          </button>
        </div>
      </section>

      {/* Route Metrics & ETA Card */}
      <section className="px-gutter py-space-sm z-20 -mt-2">
        <div className="w-full bg-surface-container rounded-xl p-space-md shadow-lg flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-telemetry-lg text-telemetry-lg text-on-surface font-black">
                {useAltRoute ? "18:44" : "18:42"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-bright text-primary font-label-md text-label-md font-bold">
                {useAltRoute ? "20 min restantes" : "18 min restantes"}
              </span>
            </div>
            <div className="text-right">
              <div className="font-telemetry-md text-telemetry-md text-on-surface font-bold">
                {useAltRoute ? "9,1 km" : "8,4 km"}
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Chegada Pontual
              </span>
            </div>
          </div>

          {/* Cost & Dynamic Route Info */}
          <div className="flex items-center justify-between pt-2 bg-surface-container-low px-3 py-2 rounded-lg text-on-surface-variant font-label-md text-label-md">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                payments
              </span>
              <span>
                Custo combustível:{" "}
                <strong className="text-on-surface font-mono">
                  {useAltRoute ? "R$ 1,96" : "R$ 1,82"}
                </strong>{" "}
                ({useAltRoute ? "0,35L" : "0,32L"})
              </span>
            </div>
            <button
              onClick={() => setUseAltRoute((prev) => !prev)}
              className="text-primary font-bold hover:underline flex items-center gap-0.5 active:scale-95 transition-transform cursor-pointer"
              type="button"
            >
              <span>{useAltRoute ? "Voltar SP-160" : "Alt. +2m livre"}</span>
              <span className="material-symbols-outlined text-[16px]">
                alt_route
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Tactile Glove-Mode High-Footprint Bottom Action Pad */}
      <section className="px-gutter pt-space-xs pb-space-md z-20">
        <div className="grid grid-cols-4 gap-2.5">
          {/* Action 1: Hazard Reporter */}
          <button
            onClick={() => setIsReportSheetOpen(true)}
            className="h-16 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex flex-col items-center justify-center gap-1 shadow-md active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-secondary text-[24px]">
              crisis_alert
            </span>
            <span className="font-label-sm text-[10px] font-bold tracking-tight uppercase">
              Reportar
            </span>
          </button>

          {/* Action 2: Fast Stops & Pit-stops */}
          <button
            onClick={onOpenFuelStops}
            className="h-16 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex flex-col items-center justify-center gap-1 shadow-md active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-primary text-[24px]">
              local_gas_station
            </span>
            <span className="font-label-sm text-[10px] font-bold tracking-tight uppercase">
              Postos
            </span>
          </button>

          {/* Action 3: Voice Copilot Assistant */}
          <button
            onClick={onOpenCopilotModal}
            className="h-16 rounded-xl bg-primary text-on-primary flex flex-col items-center justify-center gap-1 shadow-md active:scale-95 transition-all relative overflow-hidden cursor-pointer"
            type="button"
          >
            <span className="absolute inset-0 bg-primary-container/30 animate-pulse pointer-events-none"></span>
            <span className="material-symbols-outlined text-[24px]">mic</span>
            <span className="font-label-sm text-[10px] font-bold tracking-tight uppercase">
              Voz IA
            </span>
          </button>

          {/* Action 4: Dedicated Glove-Mode SOS Trigger */}
          <button
            onClick={onTriggerSos}
            className="h-16 rounded-xl bg-error-container text-on-error flex flex-col items-center justify-center gap-1 shadow-lg active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-error text-[24px] animate-bounce">
              e911_emergency
            </span>
            <span className="font-label-sm text-[10px] text-error font-extrabold tracking-tight uppercase">
              S.O.S
            </span>
          </button>
        </div>

        {/* Auxiliary Route Cancel / Recalculate Secondary Strip */}
        <div className="mt-space-sm flex items-center justify-between gap-space-sm">
          <button
            onClick={onFinishRoute}
            className="flex-1 h-12 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-2 font-label-md text-label-md active:scale-98 transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
            <span>Encerrar Rota</span>
          </button>

          <button
            onClick={() => setIsMuted((prev) => !prev)}
            aria-label="Silenciar Áudio de Navegação"
            className="w-12 h-12 rounded-lg bg-surface-container-low text-on-surface-variant flex items-center justify-center active:scale-95 transition-colors cursor-pointer"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isMuted ? "text-tertiary" : ""
              }`}
            >
              {isMuted ? "volume_off" : "volume_up"}
            </span>
          </button>

          <button
            onClick={() => setHighContrastHud((prev) => !prev)}
            aria-label="Alternar Contraste HUD"
            className="w-12 h-12 rounded-lg bg-surface-container-low text-on-surface-variant flex items-center justify-center active:scale-95 transition-colors cursor-pointer"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                highContrastHud ? "text-secondary" : ""
              }`}
            >
              brightness_medium
            </span>
          </button>
        </div>
      </section>

      {/* Interactive Quick Report Toast Sheet */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 w-full max-w-[480px] bottom-24 p-gutter z-50 transition-all duration-300 transform ${
          isReportSheetOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full bg-surface-container-high rounded-xl p-space-md shadow-2xl flex flex-col gap-space-sm border border-white/10">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-title-md text-on-surface font-bold">
              Reportar Ocorrência em 1 Toque
            </span>
            <button
              onClick={() => setIsReportSheetOpen(false)}
              className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleReportHazard("Radar Móvel")}
              className="h-16 rounded-xl bg-surface-container hover:bg-surface-container-highest text-on-surface flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-secondary text-[22px]">
                warning
              </span>
              <span className="font-label-sm text-[10px] font-bold">
                Radar Móvel
              </span>
            </button>
            <button
              onClick={() => handleReportHazard("Acidente")}
              className="h-16 rounded-xl bg-surface-container hover:bg-surface-container-highest text-on-surface flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-tertiary text-[22px]">
                car_crash
              </span>
              <span className="font-label-sm text-[10px] font-bold">
                Acidente
              </span>
            </button>
            <button
              onClick={() => handleReportHazard("Trânsito Lento")}
              className="h-16 rounded-xl bg-surface-container hover:bg-surface-container-highest text-on-surface flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-primary text-[22px]">
                traffic
              </span>
              <span className="font-label-sm text-[10px] font-bold">
                Trânsito Lento
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
