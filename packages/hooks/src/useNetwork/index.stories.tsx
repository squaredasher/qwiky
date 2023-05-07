import { component$ } from "@builder.io/qwik";
import { useNetwork } from ".";

const Test = component$(() => {
  const network = useNetwork();
  return (
    <p>
      <p>isSupported: {network.isSupported.value ? 'true' : 'false'}</p>
      <p>isOnline: {network.isOnline.value ? 'true' : 'false'}</p>
      <p>saveData: {network.saveData.value ? 'true' : 'false'}</p>
      {network.isOnline.value ? (
        <p>onlineAt: {network.onlineAt.value}</p>
      ): (
        <p>offlineAt: {network.offlineAt.value}</p>
      )}
      <p>downling: {network.downlink.value}</p>
      <p>effectiveType: {network.effectiveType.value}</p>
      <p>rtt: {network.rtt.value}</p>
    </p>
  )
});

export default {
  title: "Hooks",
  component: Test,
};

export const UseNetwork = {
  name: "useNetwork",
};
