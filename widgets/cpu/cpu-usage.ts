import GTop from "gi://GTop";

type CpuUsage = {
  total: number;
  idle: number;
};

type CpuStats = {
  current: CpuUsage;
  previous: CpuUsage;
};

export const initialCpuStats: CpuStats = {
  current: { total: 0, idle: 0 },
  previous: { total: 0, idle: 0 },
};

export function getCpuStats(previous: CpuUsage) {
  const stats = new GTop.glibtop_cpu();
  GTop.glibtop_get_cpu(stats);
  return {
    previous,
    current: {
      total: stats.total as number,
      idle: stats.idle as number,
    },
  };
}
