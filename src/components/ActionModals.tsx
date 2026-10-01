import React, { useState } from "react";
import { LogbookEntry, VehicleData } from "../data/vehicles";

export type ModalType =
  | null
  | "crlv"
  | "manual"
  | "scanner"
  | "schedule"
  | "newRecord"
  | "copilot"
  | "sos"
  | "newVehicle"
  | "profile";

interface ActionModalsProps {
  activeModal: ModalType;
  activeVehicle: VehicleData;
  onClose: () => void;
  onAddLogbookEntry: (entry: LogbookEntry) => void;
  onSwitchVehicle: () => void;
}

export const ActionModals: React.FC<ActionModalsProps> = ({
  activeModal,
  activeVehicle,
  onClose,
  onAddLogbookEntry,
  onSwitchVehicle,
}) => {
  const [recordTitle, setRecordTitle] = useState("Troca de Óleo & Filtro 10W-30");
  const [recordLocation, setRecordLocation] = useState(
    "Concessionária Honda Mavesa SP"
  );
  const [recordPrice, setRecordPrice] = useState("145,00");
  const [recordType, setRecordType] = useState<"completed" | "scheduled">(
    "completed"
  );

  const [copilotInput, setCopilotInput] = useState("");
  const [copilotMessages, setCopilotMessages] = useState<
    { sender: "ai" | "user"; text: string }[]
  >([
    {
      sender: "ai",
      text: "Olá! Sou o Copiloto MotorHelp. Detectei previsão de chuva às 17h na região da Av. dos Bandeirantes. Recomendo manter pneus em 29 PSI (D) / 33 PSI (T) e atenção à frenagem em faixas pintadas.",
    },
  ]);

  if (!activeModal) return null;

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordTitle.trim()) return;
    const newEntry: LogbookEntry = {
      id: String(Date.now()),
      title: recordTitle,
      date: "01/10/2026",
      odometer: `Aos ${activeVehicle.odometer} km`,
      location: recordLocation || "Oficina Credenciada",
      details: "Registrado via Telemetria MotorHelp",
      price: `R$ ${recordPrice || "0,00"}`,
      status: recordType,
    };
    onAddLogbookEntry(newEntry);
    onClose();
  };

  const handleSendCopilot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;
    const question = copilotInput.trim();
    setCopilotInput("");
    setCopilotMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      {
        sender: "ai",
        text: `Analisando telemetria da ${activeVehicle.fullName} (${activeVehicle.odometer} km): bateria em 14.1V saudável, autonomia para ${activeVehicle.estimatedRangeKm} km e óleo com 12% de vida útil restante (troca recomendada em ${activeVehicle.alertRemainingKm} km).`,
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-gutter">
      <div className="w-full max-w-[450px] bg-surface-container-high rounded-2xl p-space-md shadow-2xl border border-white/10 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Top Handle & Header */}
        <div className="w-10 h-1 bg-outline/40 rounded-full mx-auto mb-3"></div>

        {/* CRLV Digital Modal */}
        {activeModal === "crlv" && (
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  badge
                </span>
                <h3 className="font-title-md text-title-md text-on-surface">
                  CRLV-e Digital (SENATRAN)
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>

            <div className="bg-surface-container rounded-xl p-space-md space-y-2 border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary uppercase">
                  Documento Verificado Offline
                </span>
                <span className="font-label-sm text-label-sm bg-primary/20 text-primary px-2 py-0.5 rounded">
                  EXERCÍCIO 2025
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="font-label-sm text-label-sm text-outline block">
                    VEÍCULO
                  </span>
                  <span className="font-title-md text-title-md text-on-surface">
                    {activeVehicle.fullName}
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline block">
                    PLACA MERCOSUL
                  </span>
                  <span className="font-telemetry-md text-telemetry-md text-secondary">
                    {activeVehicle.plate}
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline block">
                    RENAVAM
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-mono">
                    01349284710
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline block">
                    STATUS IPVA / MULTAS
                  </span>
                  <span className="font-label-md text-label-md text-primary">
                    Quitado • Nada Consta
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full min-h-[48px] bg-primary text-on-primary rounded-xl font-title-md text-title-md flex items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                qr_code_2
              </span>
              <span>Exibir QR Code VIO Oficial</span>
            </button>
          </div>
        )}

        {/* Manual Técnico Modal */}
        {activeModal === "manual" && (
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  menu_book
                </span>
                <h3 className="font-title-md text-title-md text-on-surface">
                  Especificações — {activeVehicle.fullName}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
            <div className="bg-surface-container rounded-xl p-space-sm space-y-2 text-body-md">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-on-surface-variant">Óleo Recomendado</span>
                <span className="font-mono text-on-surface">
                  SAE 10W-30 JASO MA (2,7L c/ filtro)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-on-surface-variant">Calibragem Pneus</span>
                <span className="font-mono text-on-surface">
                  Diant: 29 PSI • Tras: 33 PSI
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-on-surface-variant">Folga da Corrente</span>
                <span className="font-mono text-on-surface">35 a 45 mm</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-on-surface-variant">Fluido de Freio</span>
                <span className="font-mono text-on-surface">DOT 4 Honda</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full min-h-[48px] bg-surface-container hover:bg-surface-bright text-on-surface rounded-xl font-label-md text-label-md cursor-pointer"
              type="button"
            >
              Fechar Manual Rápido
            </button>
          </div>
        )}

        {/* Scanner OBD-II Modal */}
        {activeModal === "scanner" && (
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">
                  troubleshoot
                </span>
                <h3 className="font-title-md text-title-md text-on-surface">
                  Diagnóstico Telemetria OBD-II
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-surface-container rounded-xl p-3">
                <span className="font-label-sm text-label-sm text-outline block">
                  TENSÃO BATERIA
                </span>
                <span className="font-telemetry-md text-telemetry-md text-primary">
                  14.1 V
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  Estator carregando OK
                </span>
              </div>
              <div className="bg-surface-container rounded-xl p-3">
                <span className="font-label-sm text-label-sm text-outline block">
                  TEMP. ARREFECIMENTO
                </span>
                <span className="font-telemetry-md text-telemetry-md text-primary">
                  86 °C
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  Ventoinha 100% operacional
                </span>
              </div>
              <div className="bg-surface-container rounded-xl p-3 col-span-2 flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm text-outline block">
                    CÓDIGOS DE FALHA (DTC / ECU)
                  </span>
                  <span className="font-body-md text-body-md text-on-surface">
                    0 erros registrados na injeção PGM-FI
                  </span>
                </div>
                <span className="px-2 py-1 rounded bg-primary/20 text-primary font-label-sm text-label-sm">
                  SAÚDE {activeVehicle.healthPercent}%
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full min-h-[48px] bg-primary text-on-primary rounded-xl font-title-md text-title-md cursor-pointer"
              type="button"
            >
              Concluir Leitura
            </button>
          </div>
        )}

        {/* Agendar Parceiro / Novo Registro Modal */}
        {(activeModal === "schedule" || activeModal === "newRecord") && (
          <form onSubmit={handleSaveRecord} className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  {activeModal === "schedule" ? "calendar_month" : "add_circle"}
                </span>
                <h3 className="font-title-md text-title-md text-on-surface">
                  {activeModal === "schedule"
                    ? "Agendar Serviço em Parceiro"
                    : "Novo Registro no Livro de Bordo"}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase block mb-1">
                  Serviço ou Abastecimento
                </label>
                <input
                  type="text"
                  value={recordTitle}
                  onChange={(e) => setRecordTitle(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-surface-container text-on-surface border border-white/10 focus:border-primary outline-none font-body-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase block mb-1">
                    Oficina / Posto
                  </label>
                  <input
                    type="text"
                    value={recordLocation}
                    onChange={(e) => setRecordLocation(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-surface-container text-on-surface border border-white/10 focus:border-primary outline-none font-body-md"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase block mb-1">
                    Valor (R$)
                  </label>
                  <input
                    type="text"
                    value={recordPrice}
                    onChange={(e) => setRecordPrice(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-surface-container text-on-surface border border-white/10 focus:border-primary outline-none font-telemetry-md"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setRecordType("completed")}
                  className={`flex-1 py-2 rounded-lg font-label-md text-label-md cursor-pointer ${
                    recordType === "completed"
                      ? "bg-primary-container text-on-primary-container font-bold"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  Já Realizado
                </button>
                <button
                  type="button"
                  onClick={() => setRecordType("scheduled")}
                  className={`flex-1 py-2 rounded-lg font-label-md text-label-md cursor-pointer ${
                    recordType === "scheduled"
                      ? "bg-primary-container text-on-primary-container font-bold"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  Agendado
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full min-h-[50px] bg-primary text-on-primary rounded-xl font-title-md text-title-md flex items-center justify-center gap-2 mt-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                check_circle
              </span>
              <span>Salvar no Livro de Bordo</span>
            </button>
          </form>
        )}

        {/* Copiloto IA Modal */}
        {activeModal === "copilot" && (
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  smart_toy
                </span>
                <h3 className="font-title-md text-title-md text-on-surface">
                  Copiloto MotorHelp IA
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>

            <div className="max-h-52 overflow-y-auto space-y-2 bg-surface-container rounded-xl p-3">
              {copilotMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl font-body-md text-body-md ${
                    msg.sender === "ai"
                      ? "bg-surface-container-high text-on-surface"
                      : "bg-primary text-on-primary ml-6"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendCopilot} className="flex gap-2">
              <input
                type="text"
                placeholder="Pergunte sobre pressão, óleo ou rota..."
                value={copilotInput}
                onChange={(e) => setCopilotInput(e.target.value)}
                className="flex-1 h-11 px-3 rounded-xl bg-surface-container text-on-surface border border-white/10 focus:border-primary outline-none font-body-md"
              />
              <button
                type="submit"
                className="px-4 h-11 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold cursor-pointer"
              >
                Enviar
              </button>
            </form>
          </div>
        )}

        {/* SOS Emergency Protocol Modal */}
        {activeModal === "sos" && (
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-error">
                <span className="material-symbols-outlined animate-bounce">
                  e911_emergency
                </span>
                <h3 className="font-title-md text-title-md text-error font-bold">
                  Protocolo SOS MotorHelp Ativo
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
            <div className="bg-error-container/40 border border-error/40 rounded-xl p-space-md space-y-2">
              <p className="font-body-md text-body-md text-on-surface">
                Coordenadas GPS RTK:{" "}
                <strong className="font-mono">-23.6182, -46.6634</strong> (Av.
                dos Bandeirantes, SP).
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                • 1. SMS automático pronto para 3 contatos de emergência.
                <br />• 2. Acionamento prioritário de Guincho 24h e Resgate
                190/193.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 min-h-[48px] bg-surface-container text-on-surface rounded-xl font-label-md text-label-md cursor-pointer"
                type="button"
              >
                Cancelar Alerta
              </button>
              <button
                onClick={onClose}
                className="flex-1 min-h-[48px] bg-tertiary-container text-on-tertiary-container rounded-xl font-title-md text-title-md font-bold cursor-pointer"
                type="button"
              >
                Confirmar Socorro
              </button>
            </div>
          </div>
        )}

        {/* Alternar / Novo Veículo ou Perfil */}
        {(activeModal === "newVehicle" || activeModal === "profile") && (
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-title-md text-on-surface">
                {activeModal === "profile"
                  ? "Perfil do Condutor • CNH Digital"
                  : "Garagem Multi-Veículos"}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
            <div className="bg-surface-container rounded-xl p-space-sm space-y-2">
              <p className="font-body-md text-body-md text-on-surface">
                Condutor: <strong>Felipe Silveira</strong> • CNH Cat. AB (0
                pontos)
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Veículo conectado ao dongle Bluetooth OBD-II v4.2:
                <span className="text-primary ml-1 font-bold">
                  {activeVehicle.fullName} ({activeVehicle.plate})
                </span>
              </p>
            </div>
            <button
              onClick={() => {
                onSwitchVehicle();
                onClose();
              }}
              className="w-full min-h-[48px] bg-primary text-on-primary rounded-xl font-title-md text-title-md flex items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                sync_alt
              </span>
              <span>Alternar entre CB 500X e Corolla XEi</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
