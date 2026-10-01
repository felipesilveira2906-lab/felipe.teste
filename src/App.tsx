import React, { useState } from "react";
import { ActionModals, ModalType } from "./components/ActionModals";
import { BottomNav } from "./components/BottomNav";
import { FinancesScreen } from "./components/FinancesScreen";
import { GarageScreen } from "./components/GarageScreen";
import { Header, TabId } from "./components/Header";
import { HomeCockpitScreen } from "./components/HomeCockpitScreen";
import { RoutesScreen } from "./components/RoutesScreen";
import { ServicesScreen } from "./components/ServicesScreen";
import {
  INITIAL_VEHICLES,
  LogbookEntry,
  VehicleData,
} from "./data/vehicles";

export default function App() {
  // Default to "garagem" (Image 1 / HTML 1) while "inicio" is Image 5 / HTML 3 and "rotas" is Image 3 / HTML 2
  const [activeTab, setActiveTab] = useState<TabId>("garagem");
  const [vehicles, setVehicles] =
    useState<Record<string, VehicleData>>(INITIAL_VEHICLES);
  const [activeVehicleId, setActiveVehicleId] = useState<string>("cb500x");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showAllThreeDesktop, setShowAllThreeDesktop] =
    useState<boolean>(false);

  const activeVehicle = vehicles[activeVehicleId] || vehicles.cb500x;

  const handleToggleVehicle = () => {
    setActiveVehicleId((prev) => (prev === "cb500x" ? "corolla" : "cb500x"));
  };

  const handleAddLogbookEntry = (entry: LogbookEntry) => {
    setVehicles((prev) => ({
      ...prev,
      [activeVehicleId]: {
        ...prev[activeVehicleId],
        logbook: [entry, ...prev[activeVehicleId].logbook],
      },
    }));
  };

  return (
    <div className="min-h-screen w-full bg-[#020a13] text-on-surface flex flex-col items-center justify-start relative">
      {/* Desktop Screen Switcher & Multi-Screen Preview Bar (visible on large viewports) */}
      <div className="hidden lg:flex fixed top-4 left-4 z-50 flex-col gap-1.5 bg-surface-container-low/95 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl">
        <span className="font-label-sm text-label-sm text-primary uppercase px-2 pt-0.5 tracking-wider">
          Telas do Protótipo
        </span>
        <button
          type="button"
          onClick={() => {
            setShowAllThreeDesktop(false);
            setActiveTab("garagem");
          }}
          className={`px-3 py-1.5 rounded-xl font-label-md text-label-md text-left flex items-center gap-2 transition-colors cursor-pointer ${
            !showAllThreeDesktop && activeTab === "garagem"
              ? "bg-primary text-on-primary font-bold"
              : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            garage_home
          </span>
          <span>1. Saúde &amp; Livro de Bordo</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setShowAllThreeDesktop(false);
            setActiveTab("rotas");
          }}
          className={`px-3 py-1.5 rounded-xl font-label-md text-label-md text-left flex items-center gap-2 transition-colors cursor-pointer ${
            !showAllThreeDesktop && activeTab === "rotas"
              ? "bg-primary text-on-primary font-bold"
              : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            navigation
          </span>
          <span>2. Rotas Cockpit GPS 3D</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setShowAllThreeDesktop(false);
            setActiveTab("inicio");
          }}
          className={`px-3 py-1.5 rounded-xl font-label-md text-label-md text-left flex items-center gap-2 transition-colors cursor-pointer ${
            !showAllThreeDesktop && activeTab === "inicio"
              ? "bg-primary text-on-primary font-bold"
              : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            dashboard
          </span>
          <span>3. Início &amp; Autonomia</span>
        </button>
        <div className="h-px bg-white/10 my-0.5"></div>
        <button
          type="button"
          onClick={() => setShowAllThreeDesktop((prev) => !prev)}
          className={`px-3 py-1.5 rounded-xl font-label-md text-label-md text-left flex items-center gap-2 transition-colors cursor-pointer ${
            showAllThreeDesktop
              ? "bg-secondary-container text-on-secondary-container font-bold"
              : "text-primary hover:bg-surface-container"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            view_column
          </span>
          <span>
            {showAllThreeDesktop ? "Modo App Único" : "Ver 3 Telas Lado a Lado"}
          </span>
        </button>
      </div>

      {showAllThreeDesktop ? (
        /* Side-by-Side 3-Screen Showcase on Wide Viewports */
        <div className="w-full max-w-[1440px] mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Screen 1: Garagem & Peças (Image 1) */}
          <div className="w-full max-w-[430px] mx-auto bg-surface rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
            <div className="px-4 py-2.5 bg-surface-container-lowest border-b border-white/5 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary uppercase">
                Tela 1 • Garagem &amp; Telemetria IoT
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAllThreeDesktop(false);
                  setActiveTab("garagem");
                }}
                className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer"
              >
                Expandir
              </button>
            </div>
            <div className="py-2">
              <GarageScreen
                activeVehicle={activeVehicle}
                onSelectVehicleId={setActiveVehicleId}
                onOpenNewVehicleModal={() => setActiveModal("newVehicle")}
                onOpenCrlvModal={() => setActiveModal("crlv")}
                onOpenManualModal={() => setActiveModal("manual")}
                onOpenScannerModal={() => setActiveModal("scanner")}
                onOpenScheduleModal={() => setActiveModal("schedule")}
                onOpenNewRecordModal={() => setActiveModal("newRecord")}
              />
            </div>
          </div>

          {/* Screen 2: Rotas Cockpit GPS (Image 3) */}
          <div className="w-full max-w-[430px] mx-auto bg-surface rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
            <div className="px-4 py-2.5 bg-surface-container-lowest border-b border-white/5 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary uppercase">
                Tela 2 • Rotas Cockpit GPS 3D
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAllThreeDesktop(false);
                  setActiveTab("rotas");
                }}
                className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer"
              >
                Expandir
              </button>
            </div>
            <div className="py-2">
              <RoutesScreen
                onOpenFuelStops={() => {
                  setShowAllThreeDesktop(false);
                  setActiveTab("servicos");
                }}
                onOpenCopilotModal={() => setActiveModal("copilot")}
                onTriggerSos={() => setActiveModal("sos")}
                onFinishRoute={() => {
                  setShowAllThreeDesktop(false);
                  setActiveTab("inicio");
                }}
              />
            </div>
          </div>

          {/* Screen 3: Início Cockpit Digital (Image 5) */}
          <div className="w-full max-w-[430px] mx-auto bg-surface rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
            <div className="px-4 py-2.5 bg-surface-container-lowest border-b border-white/5 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary uppercase">
                Tela 3 • Início &amp; Autonomia
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAllThreeDesktop(false);
                  setActiveTab("inicio");
                }}
                className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer"
              >
                Expandir
              </button>
            </div>
            <div className="py-2">
              <HomeCockpitScreen
                activeVehicle={activeVehicle}
                onToggleVehicle={handleToggleVehicle}
                onStartTrip={() => {
                  setShowAllThreeDesktop(false);
                  setActiveTab("rotas");
                }}
                onTriggerSos={() => setActiveModal("sos")}
                onOpenFuelModal={() => setActiveModal("newRecord")}
                onOpenWorkshops={() => {
                  setShowAllThreeDesktop(false);
                  setActiveTab("servicos");
                }}
                onOpenTripsHistory={() => {
                  setShowAllThreeDesktop(false);
                  setActiveTab("rotas");
                }}
                onOpenGarageDoc={() => setActiveModal("crlv")}
                onOpenMaintenanceDetail={() => {
                  setShowAllThreeDesktop(false);
                  setActiveTab("garagem");
                }}
                onOpenCopilotModal={() => setActiveModal("copilot")}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Interactive Mobile Shell */
        <div className="w-full max-w-[480px] min-h-screen bg-surface flex flex-col relative shadow-[0_0_60px_rgba(0,0,0,0.85)]">
          <Header
            activeTab={activeTab}
            activeVehicle={activeVehicle}
            onToggleVehicle={handleToggleVehicle}
            onTriggerSos={() => setActiveModal("sos")}
            onOpenProfile={() => setActiveModal("profile")}
          />

          <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
            {activeTab === "inicio" && (
              <HomeCockpitScreen
                activeVehicle={activeVehicle}
                onToggleVehicle={handleToggleVehicle}
                onStartTrip={() => setActiveTab("rotas")}
                onTriggerSos={() => setActiveModal("sos")}
                onOpenFuelModal={() => setActiveModal("newRecord")}
                onOpenWorkshops={() => setActiveTab("servicos")}
                onOpenTripsHistory={() => setActiveTab("rotas")}
                onOpenGarageDoc={() => setActiveModal("crlv")}
                onOpenMaintenanceDetail={() => setActiveTab("garagem")}
                onOpenCopilotModal={() => setActiveModal("copilot")}
              />
            )}

            {activeTab === "rotas" && (
              <RoutesScreen
                onOpenFuelStops={() => setActiveTab("servicos")}
                onOpenCopilotModal={() => setActiveModal("copilot")}
                onTriggerSos={() => setActiveModal("sos")}
                onFinishRoute={() => setActiveTab("inicio")}
              />
            )}

            {activeTab === "garagem" && (
              <GarageScreen
                activeVehicle={activeVehicle}
                onSelectVehicleId={setActiveVehicleId}
                onOpenNewVehicleModal={() => setActiveModal("newVehicle")}
                onOpenCrlvModal={() => setActiveModal("crlv")}
                onOpenManualModal={() => setActiveModal("manual")}
                onOpenScannerModal={() => setActiveModal("scanner")}
                onOpenScheduleModal={() => setActiveModal("schedule")}
                onOpenNewRecordModal={() => setActiveModal("newRecord")}
              />
            )}

            {activeTab === "financas" && (
              <FinancesScreen
                activeVehicle={activeVehicle}
                onOpenNewRecordModal={() => setActiveModal("newRecord")}
                onOpenCrlvModal={() => setActiveModal("crlv")}
              />
            )}

            {activeTab === "servicos" && (
              <ServicesScreen
                onOpenScheduleModal={() => setActiveModal("schedule")}
                onTriggerSos={() => setActiveModal("sos")}
                onNavigateToRoute={() => setActiveTab("rotas")}
              />
            )}
          </main>

          <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
        </div>
      )}

      <ActionModals
        activeModal={activeModal}
        activeVehicle={activeVehicle}
        onClose={() => setActiveModal(null)}
        onAddLogbookEntry={handleAddLogbookEntry}
        onSwitchVehicle={handleToggleVehicle}
      />
    </div>
  );
}
