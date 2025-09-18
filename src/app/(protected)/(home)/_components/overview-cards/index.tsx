import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

import { motion } from "framer-motion";
import Card from "@/components/Card";

export async function OverviewCardsGroup() {
  const { profit, products, users } = await getOverviewData();

  const stats = [
    { title: "Total Users", value: "1,234", change: "+12%" },
    { title: "Total Posts", value: "4,567", change: "+8%" },
    { title: "Engagement Rate", value: "24.5%", change: "+3.2%" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <OverviewCard
        label="Total Posts"
        data={{
          ...products,
          value: compactFormat(products.value),
        }}
        Icon={icons.Product}
      />

      <OverviewCard
        label="Total Users"
        data={{
          ...users,
          value: compactFormat(users.value),
        }}
        Icon={icons.Users}
      />

      <OverviewCard
        label="Engagement"
        data={{
          ...profit,
          value: "$" + compactFormat(profit.value),
        }}
        Icon={icons.Profit}
      />
    </div>
  );
}
