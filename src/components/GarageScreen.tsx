import React from "react";
import { VehicleData } from "../data/vehicles";

interface GarageScreenProps {
  activeVehicle: VehicleData;
  onSelectVehicleId: (id: string) => void;
  onOpenNewVehicleModal: () => void;
  onOpenCrlvModal: () => void;
  onOpenManualModal: () => void;
  onOpenScannerModal: () => void;
  onOpenScheduleModal: () => void;
  onOpenNewRecordModal: () => void;
}

export const GarageScreen: React.FC<GarageScreenProps> = ({
  activeVehicle,
  onSelectVehicleId,
  onOpenNewVehicleModal,
  onOpenCrlvModal,
  onOpenManualModal,
  onOpenScannerModal,
  onOpenScheduleModal,
  onOpenNewRecordModal,
}) => {
  const isMoto = activeVehicle.id === "cb500x";

  return (
    <div className="flex flex-col w-full">
      {/* Vehicle Selector Sub-bar */}
      <section className="px-gutter pt-space-sm pb-space-xs">
        <div className="flex items-center gap-space-sm overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => onSelectVehicleId("cb500x")}
            className={`flex items-center gap-space-xs px-3.5 py-2 rounded-xl flex-shrink-0 transition-colors cursor-pointer ${
              isMoto
                ? "bg-primary-container/20 text-primary"
                : "bg-surface-container text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              two_wheeler
            </span>
            <span className="font-title-md text-title-md text-on-surface">
              CB 500X
            </span>
            <span className="font-label-sm text-label-sm bg-surface-container-high px-1.5 py-0.5 rounded text-primary">
              BRA2E19
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectVehicleId("corolla")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl flex-shrink-0 transition-colors cursor-pointer ${
              !isMoto
                ? "bg-primary-container/20 text-primary"
                : "bg-surface-container text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              directions_car
            </span>
            <span className="font-body-md text-body-md">Corolla XEi</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewVehicleModal}
            className="flex items-center gap-1 bg-surface-container-high/60 text-primary hover:bg-surface-container-high px-3 py-2 rounded-xl flex-shrink-0 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="font-label-md text-label-md">Novo Veículo</span>
          </button>
        </div>

        {/* Live Telemetry Status Banner */}
        <div className="mt-space-sm bg-surface-container-low rounded-xl px-3 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-label-sm text-label-sm text-primary tracking-wide uppercase truncate">
              OBD-II Conectado • Bluetooth
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 text-on-surface">
            <span className="material-symbols-outlined text-[15px] text-outline">
              speed
            </span>
            <span className="font-telemetry-md text-telemetry-md tracking-tight">
              {activeVehicle.odometer}
            </span>
            <span className="font-label-sm text-label-sm text-outline">km</span>
          </div>
        </div>
      </section>

      {/* Vehicle Showcase Hero Card */}
      <section className="px-gutter pt-space-sm pb-space-xs">
        <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-low shadow-xl">
          {/* Background Motorcycle Visual */}
          <div className="relative w-full h-56 bg-surface-container-lowest overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              alt="Dark matte graphite Honda CB 500X motorcycle parked in a high-tech modern automotive garage workshop"
              src={activeVehicle.heroImage}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>

            {/* Top Floating Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="bg-surface-container-highest/80 backdrop-blur-md px-2.5 py-1 rounded-lg font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                {activeVehicle.brandYear}
              </span>
              <span className="bg-surface-container-highest/80 backdrop-blur-md px-2.5 py-1 rounded-lg font-label-sm text-label-sm text-secondary-fixed flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  bolt
                </span>
                Saúde {activeVehicle.healthPercent}%
              </span>
            </div>

            {/* Inline Quick Telemetry Overlay on Photo */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
              <div className="bg-surface-container/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[15px]">
                  straighten
                </span>
                <span className="font-label-sm text-label-sm text-on-surface">
                  {activeVehicle.engineSpec}
                </span>
              </div>
              <div className="bg-surface-container/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[15px]">
                  local_gas_station
                </span>
                <span className="font-label-sm text-label-sm text-on-surface">
                  {activeVehicle.tankSpec}
                </span>
              </div>
              <div className="bg-surface-container/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 flex-shrink-0">
                <span className="material-symbols-outlined text-secondary-fixed text-[15px]">
                  ev_station
                </span>
                <span className="font-label-sm text-label-sm text-on-surface font-telemetry-md">
                  {activeVehicle.maxRangeSpec}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Utilities Under Image */}
          <div className="p-space-sm bg-surface-container-low flex items-center justify-between gap-2">
            <button
              onClick={onOpenCrlvModal}
              className="flex-1 py-2.5 px-2 bg-surface-container hover:bg-surface-container-high rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">
                badge
              </span>
              <span className="font-label-md text-label-md text-on-surface truncate">
                CRLV Digital
              </span>
            </button>
            <button
              onClick={onOpenManualModal}
              className="flex-1 py-2.5 px-2 bg-surface-container hover:bg-surface-container-high rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">
                menu_book
              </span>
              <span className="font-label-md text-label-md text-on-surface truncate">
                {activeVehicle.manualLabel}
              </span>
            </button>
            <button
              onClick={onOpenScannerModal}
              className="flex-1 py-2.5 px-2 bg-surface-container hover:bg-surface-container-high rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-secondary text-[18px]">
                cable
              </span>
              <span className="font-label-md text-label-md text-on-surface truncate">
                Scanner
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Health Gauge & Urgent Predictive Alert */}
      <section className="px-gutter pt-space-sm pb-space-xs flex flex-col gap-space-sm">
        <div className="relative bg-surface-container-high rounded-2xl p-space-md shadow-lg overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-start justify-between gap-space-sm mb-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">
                  oil_barrel
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                    Alerta Preditivo
                  </span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mt-0.5">
                  {activeVehicle.alertTitle}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <span className="font-telemetry-md text-telemetry-md text-secondary block leading-none">
                {activeVehicle.alertRemainingKm}
              </span>
              <span className="font-label-sm text-label-sm text-outline">
                km restantes
              </span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
            Com base no seu perfil urbano de {activeVehicle.alertDailyProfile}, a
            troca vencerá em aproximadamente{" "}
            <span className="text-on-surface font-semibold">
              {activeVehicle.alertDays} dias
            </span>{" "}
            (ou aos {activeVehicle.alertLimitKm} km).
          </p>
          <div className="flex items-center gap-space-sm">
            <button
              onClick={onOpenScheduleModal}
              className="flex-1 min-h-[48px] px-3 bg-primary text-on-primary rounded-xl font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                calendar_month
              </span>
              <span>Agendar Parceiro</span>
            </button>
            <button
              onClick={onOpenNewRecordModal}
              className="min-h-[48px] px-3 bg-surface-container hover:bg-surface-container-highest text-on-surface rounded-xl font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                check_circle
              </span>
              <span>Registrar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Component Life Telemetry Grid (Radar Preditivo) */}
      <section className="px-gutter pt-space-sm pb-space-xs">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              tune
            </span>
            <h2 className="font-title-md text-title-md text-on-surface">
              Vida Útil das Peças
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            Telemetria IoT
          </span>
        </div>

        <div className="flex flex-col gap-space-xs">
          {/* Item 1: Óleo do Motor */}
          <div className="bg-surface-container rounded-xl p-space-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  water_drop
                </span>
                <span className="font-title-md text-title-md text-on-surface">
                  Óleo 10W-30 (Mobil Super)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-telemetry-md text-telemetry-md text-secondary">
                  12%
                </span>
                <span className="font-label-sm text-label-sm text-outline">
                  vida
                </span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full bg-secondary-container rounded-full"
                style={{ width: "12%" }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm">
                Recomendado trocar em 350 km
              </span>
              <span className="font-label-sm text-label-sm font-telemetry-md">
                Limite: 14.600 km
              </span>
            </div>
          </div>

          {/* Item 2: Pastilhas de Freio */}
          <div className="bg-surface-container rounded-xl p-space-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  adjust
                </span>
                <span className="font-title-md text-title-md text-on-surface">
                  Pastilhas de Freio (Nissin)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-telemetry-md text-telemetry-md text-primary">
                  68%
                </span>
                <span className="font-label-sm text-label-sm text-outline">
                  vida
                </span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: "68%" }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm">
                Espessura: 4.2mm (Diant.) / 3.8mm (Tras.)
              </span>
              <span className="font-label-sm text-label-sm font-telemetry-md">
                Troca: ~22.000 km
              </span>
            </div>
          </div>

          {/* Item 3: Transmissão / Relação */}
          <div className="bg-surface-container rounded-xl p-space-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  settings
                </span>
                <span className="font-title-md text-title-md text-on-surface">
                  Kit Transmissão (DID c/ Retentor)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-telemetry-md text-telemetry-md text-primary">
                  55%
                </span>
                <span className="font-label-sm text-label-sm text-outline">
                  vida
                </span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full bg-primary-container rounded-full"
                style={{ width: "55%" }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm">
                Última lubrificação: há 450 km
              </span>
              <span className="font-label-sm text-label-sm text-secondary">
                Lubrificar em 50 km
              </span>
            </div>
          </div>

          {/* Item 4: Pneus */}
          <div className="bg-surface-container rounded-xl p-space-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  tire_repair
                </span>
                <span className="font-title-md text-title-md text-on-surface">
                  Pneus Pirelli Scorpion Rally STR
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-outline">
                  D: <span className="text-primary font-telemetry-md">75%</span>
                </span>
                <span className="font-label-sm text-label-sm text-outline">
                  T: <span className="text-primary font-telemetry-md">62%</span>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <span className="font-label-sm text-label-sm text-outline mt-1 block">
                  Dianteiro (29 PSI)
                </span>
              </div>
              <div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div
                    className="h-full bg-primary-container rounded-full"
                    style={{ width: "62%" }}
                  ></div>
                </div>
                <span className="font-label-sm text-label-sm text-outline mt-1 block">
                  Traseiro (33 PSI)
                </span>
              </div>
            </div>
          </div>

          {/* Item 5: Sistema Elétrico & Arrefecimento */}
          <div className="bg-surface-container rounded-xl p-space-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">
                  battery_charging_full
                </span>
              </div>
              <div>
                <span className="font-body-md text-body-md text-on-surface block">
                  Bateria Yuasa &amp; Arrefecimento
                </span>
                <span className="font-label-sm text-label-sm text-outline">
                  14.1V em marcha lenta • Nível normal
                </span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm bg-surface-container-high text-primary px-2 py-1 rounded">
              88% OK
            </span>
          </div>
        </div>
      </section>

      {/* Timeline & Logbook (Histórico de Manutenções) */}
      <section className="px-gutter pt-space-md pb-space-lg">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              history_edu
            </span>
            <h2 className="font-title-md text-title-md text-on-surface">
              Livro de Bordo
            </h2>
          </div>
          <button
            onClick={onOpenNewRecordModal}
            className="font-label-sm text-label-sm text-primary hover:underline cursor-pointer"
            type="button"
          >
            Ver histórico completo
          </button>
        </div>

        <div className="flex flex-col gap-space-sm relative">
          {activeVehicle.logbook.map((entry) =>
            entry.status === "scheduled" ? (
              <div
                key={entry.id}
                className="bg-surface-container rounded-2xl p-space-md relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-space-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      event_repeat
                    </span>
                    <span className="font-title-md text-title-md text-on-surface">
                      {entry.title}
                    </span>
                  </div>
                  <span className="bg-primary/20 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Agendada
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                  {entry.date} • {entry.location}
                </p>
                <div className="flex items-center justify-between text-outline pt-2 bg-surface-container-low/50 px-3 py-1.5 rounded-lg">
                  <span className="font-label-sm text-label-sm">
                    {entry.details}
                  </span>
                  <span className="font-telemetry-md text-telemetry-md text-on-surface font-semibold">
                    {entry.price}
                  </span>
                </div>
              </div>
            ) : (
              <div
                key={entry.id}
                className="bg-surface-container-low rounded-2xl p-space-md"
              >
                <div className="flex items-start justify-between gap-space-sm mb-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-outline text-[18px]">
                      done_all
                    </span>
                    <span className="font-title-md text-title-md text-on-surface">
                      {entry.title}
                    </span>
                  </div>
                  <span className="font-telemetry-md text-telemetry-md text-on-surface-variant">
                    {entry.price}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {entry.date}
                  {entry.odometer ? ` • ${entry.odometer}` : ""} •{" "}
                  {entry.location}
                </p>
                {entry.details && (
                  <span className="font-label-sm text-label-sm text-outline mt-1 inline-block">
                    {entry.details}
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </section>

      {/* Sticky Operational Command Bar */}
      <section className="sticky bottom-20 z-40 px-gutter pb-4 pt-2 bg-gradient-to-t from-surface via-surface/95 to-transparent">
        <div className="flex items-center gap-space-sm">
          <button
            onClick={onOpenNewRecordModal}
            className="flex-1 min-h-[56px] px-4 bg-primary text-on-primary rounded-xl font-title-md text-title-md flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 transition-all active:scale-[0.99] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">
              add_circle
            </span>
            <span>Novo Registro</span>
          </button>
          <button
            onClick={onOpenScannerModal}
            className="min-h-[56px] px-4 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-xl font-title-md text-title-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            title="Diagnóstico Rápido"
            type="button"
          >
            <span className="material-symbols-outlined text-secondary text-[22px]">
              troubleshoot
            </span>
            <span className="hidden sm:inline">Diagnóstico</span>
          </button>
        </div>
      </section>
    </div>
  );
};
