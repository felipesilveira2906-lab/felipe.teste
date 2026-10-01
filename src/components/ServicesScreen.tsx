import React, { useState } from "react";

interface ServicesScreenProps {
  onOpenScheduleModal: () => void;
  onTriggerSos: () => void;
  onNavigateToRoute: () => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onOpenScheduleModal,
  onTriggerSos,
  onNavigateToRoute,
}) => {
  const [filter, setFilter] = useState<"all" | "fuel" | "workshop">("all");

  return (
    <div className="flex flex-col w-full px-gutter space-y-space-md pt-1 pb-6">
      {/* Filtro de Rede Parceira */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-3.5 py-2 rounded-xl font-label-md text-label-md transition-colors cursor-pointer ${
            filter === "all"
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface-container text-on-surface-variant"
          }`}
        >
          Todos (8 abertos)
        </button>
        <button
          type="button"
          onClick={() => setFilter("fuel")}
          className={`px-3.5 py-2 rounded-xl font-label-md text-label-md transition-colors cursor-pointer ${
            filter === "fuel"
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface-container text-on-surface-variant"
          }`}
        >
          Postos c/ Desconto
        </button>
        <button
          type="button"
          onClick={() => setFilter("workshop")}
          className={`px-3.5 py-2 rounded-xl font-label-md text-label-md transition-colors cursor-pointer ${
            filter === "workshop"
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface-container text-on-surface-variant"
          }`}
        >
          Oficinas &amp; Pneus
        </button>
      </div>

      {/* Destaque Posto Parceiro na Rota */}
      {(filter === "all" || filter === "fuel") && (
        <section className="bg-surface-container-high rounded-2xl p-space-md shadow-lg relative overflow-hidden">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-11 h-11 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">
                  local_gas_station
                </span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                  Menor Preço na Rota • 1.2 km
                </span>
                <h3 className="font-title-md text-title-md text-on-surface">
                  Shell Box Av. Bandeirantes
                </h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Selo Combustível Verificado ANP • 24h
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-telemetry-md text-telemetry-md text-secondary block">
                R$ 5,59
              </span>
              <span className="font-label-sm text-label-sm text-outline">
                Gasolina / L
              </span>
            </div>
          </div>

          <div className="mt-space-sm pt-space-sm border-t border-white/10 flex items-center justify-between gap-2">
            <span className="font-label-sm text-label-sm text-primary">
              Cashback MotorHelp: R$ 0,15/L ativo
            </span>
            <button
              onClick={onNavigateToRoute}
              type="button"
              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                navigation
              </span>
              <span>Ir Agora</span>
            </button>
          </div>
        </section>
      )}

      {/* Lista de Oficinas & Borracharias Certificadas */}
      {(filter === "all" || filter === "workshop") && (
        <section className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">
                car_repair
              </span>
              <h2 className="font-title-md text-title-md text-on-surface">
                Oficinas &amp; Socorro (Raio 3 km)
              </h2>
            </div>
            <span className="font-label-sm text-label-sm text-outline uppercase">
              Credenciadas
            </span>
          </div>

          <div className="flex flex-col gap-space-sm">
            {/* Parceiro 1 */}
            <div className="bg-surface-container rounded-2xl p-space-md flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-title-md text-title-md text-on-surface block">
                    Concessionária Honda Mavesa SP
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    A 1.8 km • Box Rápido Óleo &amp; Filtro
                  </span>
                </div>
                <span className="font-label-sm text-label-sm bg-primary/20 text-primary px-2 py-0.5 rounded">
                  4.9 ★
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-label-sm text-label-sm text-secondary">
                  Kit Troca Óleo 10W-30 + Filtro: R$ 145,00
                </span>
                <button
                  onClick={onOpenScheduleModal}
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md cursor-pointer"
                >
                  Agendar
                </button>
              </div>
            </div>

            {/* Parceiro 2 */}
            <div className="bg-surface-container rounded-2xl p-space-md flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-title-md text-title-md text-on-surface block">
                    Borracharia &amp; Moto Center Mooca
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    A 2.4 km • Reparo de Pneu s/ Câmara &amp; Balanceamento
                  </span>
                </div>
                <span className="font-label-sm text-label-sm bg-primary/20 text-primary px-2 py-0.5 rounded">
                  4.8 ★
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-label-sm text-label-sm text-outline">
                  Aberto até 22h • Atendimento imediato
                </span>
                <button
                  onClick={onNavigateToRoute}
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-primary font-label-md text-label-md cursor-pointer"
                >
                  Traçar Rota
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Acionamento Rápido de Guincho / Socorro 24h */}
      <section className="bg-surface-container-low rounded-2xl p-space-md flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <div className="w-11 h-11 rounded-xl bg-error-container text-error flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">
              rv_hookup
            </span>
          </div>
          <div>
            <span className="font-title-md text-title-md text-on-surface block">
              Guincho &amp; Socorro Mecânico 24h
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Tempo médio de chegada na sua região: 22 min
            </span>
          </div>
        </div>
        <button
          onClick={onTriggerSos}
          type="button"
          className="px-3.5 py-2.5 rounded-xl bg-error-container text-error font-label-md text-label-md font-bold cursor-pointer"
        >
          Chamar
        </button>
      </section>
    </div>
  );
};
