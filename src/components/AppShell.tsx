"use client";

import React, { useState, createContext, useContext } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { OrderForm } from "./OrderForm";
import { Chatbot } from "./Chatbot";

interface OrderModalContextType {
  openOrderModal: (serviceId?: string) => void;
}

const OrderModalContext = createContext<OrderModalContextType>({
  openOrderModal: () => {},
});

export const useOrderModal = () => useContext(OrderModalContext);

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOrderClick = (serviceId: string = "") => {
    setSelectedService(serviceId);
    setIsOrderFormOpen(true);
  };

  return (
    <OrderModalContext.Provider value={{ openOrderModal: handleOrderClick }}>
      <Header onOrderClick={() => handleOrderClick()} />
      <main>{children}</main>
      <Footer />
      
      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        initialService={selectedService}
      />
      <Chatbot isOrderFormOpen={isOrderFormOpen} />
    </OrderModalContext.Provider>
  );
};
