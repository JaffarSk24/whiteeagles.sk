"use client";

import React, { useEffect } from "react";
import { useOrderModal } from "../../../../components/AppShell";
import { trackGAEvent } from "../../../../utils/analytics";

interface ServiceDetailClientProps {
  serviceId: string;
  orderText: string;
  price: number;
  title: string;
}

export const ServiceDetailClient: React.FC<ServiceDetailClientProps> = ({ serviceId, orderText, price, title }) => {
  const { openOrderModal } = useOrderModal();

  useEffect(() => {
    trackGAEvent("view_item", {
      currency: "EUR",
      value: price,
      items: [
        {
          item_id: serviceId,
          item_name: title,
          price: price,
        },
      ],
    });
  }, [serviceId, price, title]);

  return (
    <button className="btn btn-primary btn-lg" onClick={() => openOrderModal(serviceId)}>
      {orderText}
    </button>
  );
};
