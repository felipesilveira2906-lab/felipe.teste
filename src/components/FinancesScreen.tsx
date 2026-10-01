import React from "react";
import { VehicleData } from "../data/vehicles";

interface FinancesScreenProps {
  activeVehicle: VehicleData;
  onOpenNewRecordModal: () => void;
  onOpenCrlvModal: () => void;
}

export const FinancesScreen: React.FC<FinancesScreenProps> = ({
  activeVehicle,
  onOpenNewRecordModal,
  onOpenCrlvModal,
}) => {
  return (
    <div className="flex flex-col w-full px-gutter space-y-space-md pt-1 pb-6">
      {/* Resumo Financeiro / TCO (Custo Total por KM) */}
      <section className="bg-surface-container rounded-2xl p-space-md shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>
        <div className="flex items-start justify-between gap-space-sm">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
              Custo Mensal • Outubro
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-label-md text-label-md text-on-surface-variant">
                R$
              </span>
              <span className="font-telemetry-lg text-telemetry-lg text-on-surface">
                482,90
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              12% abaixo da média de Setembro
            </span>
          </div>
          <div className="bg-surface-container-lowest px-3 py-2 rounded-xl text-right">
            <span className="font-label-sm text-label-sm text-outline block uppercase">
              Custo / KM
            </span>
            <span className="font-telemetry-md text-telemetry-md text-secondary block">
              R$ 0,24
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {activeVehicle.avgConsumption}
            </span>
          </div>
        </div>

        {/* Barra de Distribuição de Custos */}
        <div className="mt-space-md space-y-2">
          <div className="w-full h-2.5 rounded-full bg-surface-container-highest overflow-hidden flex gap-0.5">
            <div
              className="h-full bg-primary-container rounded-l-full"
              style={{ width: "58%" }}
              title="Combustível 58%"
            ></div>
            <div
              className="h-full bg-secondary-container"
              style={{ width: "27%" }}
              title="Manutenção 27%"
            ></div>
            <div
              className="h-full bg-tertiary"
              style={{ width: "15%" }}
              title="Impostos & Pedágio 15%"
            ></div>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Combustível (R$ 280)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              Revisão (R$ 130)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              Docs (R$ 72,90)
            </span>
          </div>
        </div>
      </section>

      {/* Status de Impostos & Seguro */}
      <section className="grid grid-cols-2 gap-space-sm">
        <div
          onClick={onOpenCrlvModal}
          className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between min-h-[110px] cursor-pointer hover:bg-surface-container transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                verified_user
              </span>
            </div>
            <span className="font-label-sm text-label-sm bg-surface-container-high text-primary px-2 py-0.5 rounded">
              QUITADO
            </span>
          </div>
          <div className="mt-2">
            <span className="font-label-sm text-label-sm text-outline uppercase">
              IPVA &amp; Licenciamento
            </span>
            <span className="font-title-md text-title-md text-on-surface block">
              Exercício 2025
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Zero multas no RENAINF
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                shield_with_heart
              </span>
            </div>
            <span className="font-label-sm text-label-sm bg-surface-container-high text-secondary px-2 py-0.5 rounded">
              VIGENTE
            </span>
          </div>
          <div className="mt-2">
            <span className="font-label-sm text-label-sm text-outline uppercase">
              Seguro Suhai / Porto
            </span>
            <span className="font-title-md text-title-md text-on-surface block">
              Cobertura Total
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Guincho 24h ilimitado
            </span>
          </div>
        </div>
      </section>

      {/* Últimos Abastecimentos e Despesas */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              receipt_long
            </span>
            <h2 className="font-title-md text-title-md text-on-surface">
              Extrato do Veículo
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenNewRecordModal}
            className="font-label-sm text-label-sm text-primary hover:underline cursor-pointer"
          >
            + Lançar gasto
          </button>
        </div>

        <div className="flex flex-col gap-space-xs">
          <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  local_gas_station
                </span>
              </div>
              <div>
                <span className="font-title-md text-title-md text-on-surface block">
                  Posto Shell Box Bandeirantes
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Hoje • 13,4 L Gasolina Grid (R$ 5,69/L)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-telemetry-md text-telemetry-md text-on-surface block">
                R$ 76,25
              </span>
              <span className="font-label-sm text-label-sm text-primary">
                28,6 km/L
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  build
                </span>
              </div>
              <div>
                <span className="font-title-md text-title-md text-on-surface block">
                  Lubrificante Corrente Motul C4
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  28/03/2025 • Aos 13.800 km
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-telemetry-md text-telemetry-md text-on-surface block">
                R$ 35,00
              </span>
              <span className="font-label-sm text-label-sm text-outline">
                Manutenção
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  local_gas_station
                </span>
              </div>
              <div>
                <span className="font-title-md text-title-md text-on-surface block">
                  Posto Ipiranga Marginal Pinheiros
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  19/03/2025 • 14,1 L Gasolina Comum
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-telemetry-md text-telemetry-md text-on-surface block">
                R$ 78,80
              </span>
              <span className="font-label-sm text-label-sm text-primary">
                28,1 km/L
              </span>
            </div>
          </div>
        </div>
      </section>

      <button
        onClick={onOpenNewRecordModal}
        className="w-full min-h-[56px] bg-primary text-on-primary rounded-xl font-title-md text-title-md flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 transition-all cursor-pointer"
        type="button"
      >
        <span className="material-symbols-outlined text-[22px]">
          add_circle
        </span>
        <span>Novo Lançamento Financeiro</span>
      </button>
    </div>
  );
};
