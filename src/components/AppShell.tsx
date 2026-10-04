"use client";

import React, { useState, createContext, useContext } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { OrderForm } from "./OrderForm";
import { Chatbot } from "./Chatbot";

interface OrderModalContextType {
  /** `message` pre-fills the free-text field, which the price calculator
      uses to hand over what the visitor picked. */
  openOrderModal: (serviceId?: string, message?: string) => void;
}

const OrderModalContext = createContext<OrderModalContextType>({
  openOrderModal: () => {},
});

export const useOrderModal = () => useContext(OrderModalContext);

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [initialMessage, setInitialMessage] = useState("");

  const handleOrderClick = (serviceId: string = "", message: string = "") => {
    setSelectedService(serviceId);
    setInitialMessage(message);
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
        initialMessage={initialMessage}
      />
      <Chatbot isOrderFormOpen={isOrderFormOpen} />
    </OrderModalContext.Provider>
  );
};
