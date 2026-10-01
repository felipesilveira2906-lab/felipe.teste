import React, { useRef, useState } from "react";
import { VehicleData } from "../data/vehicles";

interface HomeCockpitScreenProps {
  activeVehicle: VehicleData;
  onToggleVehicle: () => void;
  onStartTrip: () => void;
  onTriggerSos: () => void;
  onOpenFuelModal: () => void;
  onOpenWorkshops: () => void;
  onOpenTripsHistory: () => void;
  onOpenGarageDoc: () => void;
  onOpenMaintenanceDetail: () => void;
  onOpenCopilotModal: () => void;
}

export const HomeCockpitScreen: React.FC<HomeCockpitScreenProps> = ({
  activeVehicle,
  onToggleVehicle,
  onStartTrip,
  onTriggerSos,
  onOpenFuelModal,
  onOpenWorkshops,
  onOpenTripsHistory,
  onOpenGarageDoc,
  onOpenMaintenanceDetail,
  onOpenCopilotModal,
}) => {
  const [isHoldingSos, setIsHoldingSos] = useState(false);
  const holdTimerRef = useRef<number | null>(null);

  const circumference = 251.32;
  const strokeDashoffset =
    circumference - (activeVehicle.tankPercent / 100) * circumference;

  const startHold = () => {
    setIsHoldingSos(true);
    holdTimerRef.current = window.setTimeout(() => {
      setIsHoldingSos(false);
      if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
      onTriggerSos();
    }, 1500);
  };

  const resetHold = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsHoldingSos(false);
  };

  return (
    <div className="flex flex-col w-full px-gutter space-y-space-md">
      {/* 1. Veículo Ativo & Chips de Telemetria e Conectividade */}
      <section className="flex flex-col gap-space-xs pt-1">
        <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between gap-space-sm shadow-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                {activeVehicle.type === "moto"
                  ? "sports_motorsports"
                  : "directions_car"}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-title-md text-title-md text-on-surface truncate">
                  {activeVehicle.fullName}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant px-1.5 py-0.5 rounded bg-surface-container">
                  {activeVehicle.year}
                </span>
              </div>
              <div className="flex items-center gap-space-xs mt-0.5">
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-bright text-on-surface font-telemetry-md">
                  {activeVehicle.plate}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px] text-secondary">
                    local_gas_station
                  </span>{" "}
                  {activeVehicle.fuelType}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onToggleVehicle}
            className="h-10 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center gap-1 transition-colors flex-shrink-0 cursor-pointer"
            type="button"
          >
            <span>Trocar</span>
            <span className="material-symbols-outlined text-[16px]">
              sync_alt
            </span>
          </button>
        </div>

        {/* Status de Sensores / Conexão rápida */}
        <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm font-telemetry-md">
              GPS Preciso (±3m)
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant flex-shrink-0">
            <span className="material-symbols-outlined text-[15px] text-primary">
              battery_charging_full
            </span>
            <span className="font-label-sm text-label-sm font-telemetry-md">
              92%
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant flex-shrink-0">
            <span className="material-symbols-outlined text-[15px] text-secondary">
              bluetooth_connected
            </span>
            <span className="font-label-sm text-label-sm">
              OBD-II Conectado
            </span>
          </div>
        </div>
      </section>

      {/* 2. Hero de Telemetria e Cockpit Digital */}
      <section className="bg-surface-container rounded-xl p-space-md shadow-md relative overflow-hidden">
        {/* Fundo de iluminação ambiente técnica */}
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-space-md">
          {/* Medidor Circular de Autonomia + Odômetro */}
          <div className="flex items-center justify-between gap-space-md">
            {/* Indicador Radial Personalizado */}
            <div className="flex items-center gap-space-md">
              <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  <circle
                    className="text-surface-container-highest"
                    cx="48"
                    cy="48"
                    fill="transparent"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                  ></circle>
                  <circle
                    className="text-primary-container transition-all duration-700"
                    cx="48"
                    cy="48"
                    fill="transparent"
                    r="40"
                    stroke="currentColor"
                    strokeDasharray="251.32"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    strokeWidth="8"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-telemetry-md text-telemetry-md text-on-surface font-bold leading-none">
                    {activeVehicle.tankPercent}%
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                    Tanque
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">
                  Autonomia Estimada
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-telemetry-lg text-telemetry-lg text-on-surface tracking-tight">
                    {activeVehicle.estimatedRangeKm}
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    km
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Média: {activeVehicle.avgConsumption}
                </span>
              </div>
            </div>

            {/* Odômetro Digital HUD */}
            <div className="flex flex-col items-end text-right">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Odômetro
              </span>
              <div className="px-2 py-1 rounded bg-surface-container-lowest mt-0.5">
                <span className="font-telemetry-md text-telemetry-md text-primary font-bold tracking-widest">
                  {activeVehicle.odometer}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant ml-0.5">
                  KM
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-primary">
                  verified
                </span>
                Sinc. GPS
              </span>
            </div>
          </div>

          {/* Barra de Progresso Linear de Capacidade */}
          <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
            <div
              className="bg-primary-container h-full rounded-full transition-all duration-500"
              style={{ width: `${activeVehicle.tankPercent}%` }}
            ></div>
          </div>

          {/* Alerta Preventivo de Manutenção */}
          <div
            onClick={onOpenMaintenanceDetail}
            className="bg-surface-container-high rounded-lg p-space-sm flex items-center justify-between gap-space-sm cursor-pointer hover:bg-surface-container-highest transition-colors"
          >
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  oil_barrel
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                  Alerta de Manutenção
                </span>
                <span className="font-body-md text-body-md text-on-surface truncate">
                  Troca de óleo em {activeVehicle.alertRemainingKm} km (ou 18
                  dias)
                </span>
              </div>
            </div>
            <button
              className="w-8 h-8 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center flex-shrink-0 hover:bg-surface-bright transition-colors"
              title="Ver detalhes do plano de revisão"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Barra de Ações Críticas (Touch Targets para Pilotagem/Uso com Luva) */}
      <section className="flex items-center gap-space-sm">
        {/* Iniciar Viagem: 65% */}
        <button
          onClick={onStartTrip}
          className="w-[65%] min-h-[58px] bg-primary text-on-primary rounded-xl px-space-md py-2.5 flex items-center justify-between shadow-lg active:scale-[0.98] transition-transform cursor-pointer"
          type="button"
        >
          <div className="flex items-center gap-space-sm min-w-0 text-left">
            <div className="w-10 h-10 rounded-lg bg-on-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                navigation
              </span>
            </div>
            <div className="flex flex-col truncate">
              <span className="font-title-md text-title-md font-bold leading-tight truncate">
                Iniciar Viagem
              </span>
              <span className="font-label-sm text-label-sm text-on-primary/80 truncate">
                Livre ou Destino
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[20px] flex-shrink-0">
            play_arrow
          </span>
        </button>

        {/* SOS Emergência: 35% com proteção de pressão longa */}
        <button
          onMouseDown={startHold}
          onMouseUp={resetHold}
          onMouseLeave={resetHold}
          onTouchStart={startHold}
          onTouchEnd={resetHold}
          onTouchCancel={resetHold}
          className="w-[35%] min-h-[58px] bg-tertiary-container text-on-tertiary-container rounded-xl px-2 py-2 flex flex-col items-center justify-center text-center relative overflow-hidden select-none active:scale-[0.98] transition-all shadow-lg cursor-pointer"
          title="Pressione e segure por 1.5s para disparar SOS"
          type="button"
        >
          <div
            className="absolute inset-y-0 left-0 bg-on-tertiary-container/30 pointer-events-none"
            style={{
              width: isHoldingSos ? "100%" : "0%",
              transition: isHoldingSos
                ? "width 1.5s linear"
                : "width 0.2s ease-out",
            }}
          ></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[20px] animate-pulse">
                crisis_alert
              </span>
              <span className="font-title-md text-title-md font-bold">
                SOS
              </span>
            </div>
            <span className="font-label-sm text-label-sm opacity-90 leading-none">
              Segure 1.5s
            </span>
          </div>
        </button>
      </section>

      {/* 4. Grid de Atalhos Rápidos Ergonômicos (2x2) */}
      <section className="grid grid-cols-2 gap-space-sm">
        {/* Card 1: Abastecimento */}
        <div
          onClick={onOpenFuelModal}
          className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between min-h-[126px] shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                local_gas_station
              </span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">
              add_circle
            </span>
          </div>
          <div className="mt-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wide">
              Abastecimento
            </span>
            <span className="font-title-md text-title-md text-on-surface font-bold block mt-0.5">
              {activeVehicle.lastFuelPrice}
              <span className="font-body-md text-body-md text-on-surface-variant">
                /L
              </span>
            </span>
            <span className="font-label-sm text-label-sm text-primary font-telemetry-md">
              28 km/L médio
            </span>
          </div>
        </div>

        {/* Card 2: Oficinas & Socorro */}
        <div
          onClick={onOpenWorkshops}
          className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between min-h-[126px] shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                car_repair
              </span>
            </div>
            <span
              className="w-2.5 h-2.5 rounded-full bg-primary"
              title="8 parceiros disponíveis"
            ></span>
          </div>
          <div className="mt-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wide">
              Oficinas &amp; Socorro
            </span>
            <span className="font-title-md text-title-md text-on-surface font-bold block mt-0.5">
              8 parceiros
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Raio 3 km abertos
            </span>
          </div>
        </div>

        {/* Card 3: Histórico de Viagens */}
        <div
          onClick={onOpenTripsHistory}
          className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between min-h-[126px] shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                route
              </span>
            </div>
            <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
              Hoje
            </span>
          </div>
          <div className="mt-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wide">
              Viagens Hoje
            </span>
            <span className="font-title-md text-title-md text-on-surface font-bold block mt-0.5">
              42 km{" "}
              <span className="font-body-md text-body-md text-on-surface-variant">
                / 3 rotas
              </span>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-telemetry-md">
              1h 15m em trânsito
            </span>
          </div>
        </div>

        {/* Card 4: Garagem & Documentação */}
        <div
          onClick={onOpenGarageDoc}
          className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between min-h-[126px] shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                badge
              </span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]">
              verified_user
            </span>
          </div>
          <div className="mt-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wide">
              Garagem &amp; Doc
            </span>
            <span className="font-title-md text-title-md text-on-surface font-bold block mt-0.5 truncate">
              CRLV em dia
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              IPVA 2025 Quitado
            </span>
          </div>
        </div>
      </section>

      {/* 5. Widget do Assistente Inteligente MotorHelp (Copiloto IA) */}
      <section className="bg-surface-container-low rounded-xl p-space-md shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-space-sm">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">
              smart_toy
            </span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-title-md text-title-md text-on-surface font-semibold">
                Copiloto MotorHelp
              </span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                Previsão Climática
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-snug">
              Tempo chuvoso previsto para 17h. Verifique a calibragem dos pneus
              dianteiros (
              <span className="text-on-surface font-semibold">32 PSI</span>{" "}
              recomendado para pista molhada).
            </p>
            <div className="mt-space-sm pt-space-xs flex items-center justify-between">
              <button
                onClick={onOpenCopilotModal}
                className="h-9 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center gap-1.5 transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  chat
                </span>
                <span>Perguntar ao Copiloto IA</span>
              </button>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Modo Moto Seguro
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Feed de Alertas Comunitários e Trânsito Próximo */}
      <section className="flex flex-col gap-space-xs pb-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              fmd_bad
            </span>
            <span className="font-title-md text-title-md text-on-surface font-bold">
              Alertas na sua Rota
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Atualizado há 2 min
          </span>
        </div>

        <div className="flex flex-col gap-space-xs mt-1">
          {/* Alerta 1: Radar Móvel */}
          <div
            onClick={onStartTrip}
            className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm shadow-sm cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">
                speed
              </span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface font-bold truncate">
                  Radar móvel reportado
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-telemetry-md">
                  a 1.2 km
                </span>
              </div>
              <span className="font-body-md text-body-md text-on-surface-variant truncate">
                Av. dos Bandeirantes, sentido Marginal
              </span>
              <span className="font-label-sm text-label-sm text-outline mt-0.5">
                Confirmado por 14 condutores
              </span>
            </div>
          </div>

          {/* Alerta 2: Obra na Pista */}
          <div
            onClick={onStartTrip}
            className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm shadow-sm cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-tertiary-container/20 text-tertiary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">
                construction
              </span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface font-bold truncate">
                  Obras na pista da direita
                </span>
                <span className="font-label-sm text-label-sm text-tertiary font-telemetry-md">
                  a 3.0 km
                </span>
              </div>
              <span className="font-body-md text-body-md text-on-surface-variant truncate">
                Trânsito lento (+8 min de acréscimo)
              </span>
              <span className="font-label-sm text-label-sm text-outline mt-0.5">
                Faixa bloqueada para recapeamento
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
