import type { ProjectEvidence } from '@/types/site';

// Audited source snapshots. Runtime pages never request GitHub data.
export const projectEvidence = {
  "regional": [
    {
      "label": "View topology source",
      "kind": "topology",
      "caption": "A simplified reading of the published topology: upstream connectivity, core routing, policy controls and subscriber distribution. Addresses, locations and capacity claims are omitted from this plate.",
      "sourceUrl": "https://github.com/AIKUSAN/regional-fiber-isp/blob/eaac33907eb375f4a4fc1dabfa6f37e3c454b1f6/topology.drawio",
      "illustration": "regional-network"
    },
    {
      "label": "View router configuration",
      "kind": "configuration",
      "caption": "RouterOS source showing VLAN interfaces, route priorities, NAT and router input rules. Read alongside the topology to inspect how the documented controls are expressed.",
      "sourceUrl": "https://github.com/AIKUSAN/regional-fiber-isp/blob/eaac33907eb375f4a4fc1dabfa6f37e3c454b1f6/mikrotik-core-router.rsc"
    }
  ],
  "netops": [
    {
      "label": "View comparison logic",
      "kind": "source",
      "caption": "The comparison function turns golden and running configurations into a unified text diff. The source excerpt below shows the comparison path.",
      "sourceUrl": "https://github.com/AIKUSAN/netops-automation-framework/blob/c798785615f96afbc50e180988b2904c016a1a02/app/core/drift_detector.py#L168-L182",
      "excerpt": {
        "language": "Python",
        "text": "def _compare_configs(self, running: str, golden: str) -> str:\n    \"\"\"Generate unified diff between configs\"\"\"\n    \n    running_lines = running.splitlines(keepends=True)\n    golden_lines = golden.splitlines(keepends=True)\n    \n    diff = difflib.unified_diff(\n        golden_lines,\n        running_lines,\n        fromfile='golden_config',\n        tofile='running_config',\n        lineterm=''\n    )\n    \n    return ''.join(diff)"
      }
    },
    {
      "label": "View severity classification",
      "kind": "source",
      "caption": "A keyword- and text-length-based heuristic: critical checks run first, then high-priority checks, followed by a threshold for remaining differences.",
      "sourceUrl": "https://github.com/AIKUSAN/netops-automation-framework/blob/c798785615f96afbc50e180988b2904c016a1a02/app/core/drift_detector.py#L184-L199"
    },
    {
      "label": "View test cases",
      "kind": "tests",
      "caption": "Read the existing pytest cases for drift/no-drift, critical/low severity, file mapping and group checks. Device responses are mocked to isolate the behavior under inspection.",
      "sourceUrl": "https://github.com/AIKUSAN/netops-automation-framework/blob/c798785615f96afbc50e180988b2904c016a1a02/tests/test_drift_detector.py"
    }
  ],
  "bash": [
    {
      "label": "View database backup script",
      "kind": "source",
      "caption": "Inspect the mysqldump-to-gzip flow, timestamped backup paths and retention handling, including the script's logging and notification calls.",
      "sourceUrl": "https://github.com/AIKUSAN/bash-devops-toolkit/blob/b7e541c902ae562de8f006c0a9332438dc396a3c/scripts/backup/database-backup.sh"
    },
    {
      "label": "View health-check script",
      "kind": "source",
      "caption": "Linux CPU, memory, disk, load and systemd service checks, with configurable thresholds and alert cooldown logic.",
      "sourceUrl": "https://github.com/AIKUSAN/bash-devops-toolkit/blob/b7e541c902ae562de8f006c0a9332438dc396a3c/scripts/monitoring/server-health-check.sh"
    }
  ],
  "database": [
    {
      "label": "View profiling queries",
      "kind": "sql",
      "caption": "SQL for inspecting query digests, index usage, buffer-pool statistics, connections and lock waits, alongside statements for enabling query logging.",
      "sourceUrl": "https://github.com/AIKUSAN/docker-kubernetes-automation/blob/dc97a671d3d0832e1c3093d524b2db0c9b4f747b/benchmarks/query-profiling.sql"
    },
    {
      "label": "View database configuration",
      "kind": "configuration",
      "caption": "Inspect connection, InnoDB, logging and durability settings alongside the profiling queries to understand the configuration choices.",
      "sourceUrl": "https://github.com/AIKUSAN/docker-kubernetes-automation/blob/dc97a671d3d0832e1c3093d524b2db0c9b4f747b/configs/production-optimized.cnf"
    }
  ]
} satisfies Record<string, ProjectEvidence[]>;
