# Evidence review — 2026-09-11

## Method and boundary

Read-only GitHub inspection at four pinned commits. Nine public artifact links resolve to eight unique files; every file was fetched at its commit and its blob SHA checked against the corresponding non-truncated Git tree. Additional context inspected includes the NetOps entry point/remediation engine and Bash shared helpers/configuration template. The NetOps comparison excerpt preserves source lines 168–182 with only common indentation removed.

This is a source and claim audit, not independent validation, a repository quality certification, a passing remote test run or evidence of live deployment. No repository code, SQL, backup scripts or network configuration was executed. No GitHub repository was modified.

## Claim map

| Record | Published statements and basis |
| --- | --- |
| Client IT Support Operations | Repair, diagnostics, PC/Mac support, components, recovery, procurement, setup, testing, documentation and client guidance: unchanged approved career baseline in the pre-upgrade `src/data/site.ts` and public résumé sources. The approved 20+ figure describes defined IT service projects, not a client count. Work approach restates these responsibilities. This is an aggregate record with no invented incident, quotation or historic document. |
| Regional ISP Core Operations | MikroTik/pfSense operations, network controls and troubleshooting, plus 700+ concurrent subscribers: approved career baseline and unchanged network-employment entry. Public topology supports the conceptual upstream/core/policy/distribution/access sequence. Router source supports VLAN interfaces, route priority, NAT and input rules. Captions explicitly distinguish source artifacts from an as-built deployment. |
| NetOps Automation Framework | Comparison: `drift_detector.py` 168–182. Severity: 184–199 (keyword matching and diff-string length, not semantic risk analysis). Golden-template selection: 150–166. Device retrieval: 47–68. Mapping: 201–223. Existing tests: `tests/test_drift_detector.py` 31–140, mocked responses and selected cases, not complete coverage or an asserted pass. Contribution and decisions summarize this inspected implementation. |
| Secure Site Deployment Documentation | March 2025 contract, network/AP/workstation/software/account setup, printers/shared resources and user guides: existing approved contract entry and résumé sources. Work approach restates the documented responsibilities. No internal client artifact is invented or published. |
| Bash Operations Toolkit | Database dump/compression/retention and host CPU/RAM/disk/load/service checks: the two linked scripts. Shared configuration imports and notification calls are present. Captions describe code paths, not successful execution, recoverability or prevented outages. |
| MariaDB Tuning Workbook | Query digests, index usage, buffers, connections and lock waits: linked SQL. Connection, InnoDB, logging and durability settings: linked configuration. No benchmark, performance improvement, universal safe preset or production throughput is asserted. |

Titles, technology labels, summaries, contributions, decision notes and artifact captions are bounded by these sources. Scope notes distinguish the kind of evidence rather than adding new capability claims. Employment entries, education, résumé PDFs and sources, role types and IDs remain outside this upgrade.

## Narrowed or excluded claims

- NetOps: removed Redis-backed task flow and approval gates. `app/main.py` leaves Redis initialization and real service health checks as TODOs, imports a logger module absent from the pinned tree, and has a webhook verification TODO. `remediation_engine.py` accepts but does not enforce the documented `force` approval behavior. No startability, full workflow, deployment or passing tests claimed.
- ISP: original documentation contains inconsistent network details, location information and unapproved capacity/uptime/failover claims. The new SVG omits these rather than reproducing the source diagram. Existing public source remains externally inspectable as expressly requested. Missing README-linked SVG/PNG/config directories are not linked.
- Bash: the pinned tree contains the two operational scripts, not the README's wider deployment/rollback suite. Backup code has unvalidated failure and retention behavior (including post-increment under `set -e` and recursive retention deletion); no safety or successful restore claim. Scripts were not run.
- MariaDB: no README speedup/query-volume claims adopted. Configuration includes durability tradeoffs and environment-specific values; profiling SQL changes logging settings. No statements that settings are universally safe or benchmarked.

## Verified public artifact inventory

| Pinned file | Verified Git blob SHA |
| --- | --- |
| [regional-fiber-isp/topology.drawio](https://github.com/AIKUSAN/regional-fiber-isp/blob/eaac33907eb375f4a4fc1dabfa6f37e3c454b1f6/topology.drawio) | `cc95f926708042097628a836941149ec28ff2fa0` |
| [regional-fiber-isp/mikrotik-core-router.rsc](https://github.com/AIKUSAN/regional-fiber-isp/blob/eaac33907eb375f4a4fc1dabfa6f37e3c454b1f6/mikrotik-core-router.rsc) | `3617064aece600626cd15c6d87b1dea39af915c6` |
| [netops-automation-framework/app/core/drift_detector.py](https://github.com/AIKUSAN/netops-automation-framework/blob/c798785615f96afbc50e180988b2904c016a1a02/app/core/drift_detector.py) | `b9c331f8c763fef67aca2a174f612a5fb7f73f51` |
| [netops-automation-framework/tests/test_drift_detector.py](https://github.com/AIKUSAN/netops-automation-framework/blob/c798785615f96afbc50e180988b2904c016a1a02/tests/test_drift_detector.py) | `9ce4a7dd60cc397025d1d2c334acadaafa50e13c` |
| [bash-devops-toolkit/scripts/backup/database-backup.sh](https://github.com/AIKUSAN/bash-devops-toolkit/blob/b7e541c902ae562de8f006c0a9332438dc396a3c/scripts/backup/database-backup.sh) | `c287a63624af08377c178734b4a83765b92c0805` |
| [bash-devops-toolkit/scripts/monitoring/server-health-check.sh](https://github.com/AIKUSAN/bash-devops-toolkit/blob/b7e541c902ae562de8f006c0a9332438dc396a3c/scripts/monitoring/server-health-check.sh) | `d0ebac3391b1fdef2cad1e71a51df6f4d6206ff5` |
| [docker-kubernetes-automation/benchmarks/query-profiling.sql](https://github.com/AIKUSAN/docker-kubernetes-automation/blob/dc97a671d3d0832e1c3093d524b2db0c9b4f747b/benchmarks/query-profiling.sql) | `f29b9cbbae48a25ff2eee4d47eed6e812f663974` |
| [docker-kubernetes-automation/configs/production-optimized.cnf](https://github.com/AIKUSAN/docker-kubernetes-automation/blob/dc97a671d3d0832e1c3093d524b2db0c9b4f747b/configs/production-optimized.cnf) | `0e6413b9bd880c3860a148aec3ea3dd39ed0b26c` |

## Rendering and privacy

All evidence is generated into local static pages. Excerpts use Astro text escaping, with no executable examples, iframe, runtime GitHub request or added client island. The metric-free SVG has a title, description and caption, and uses the existing theme tokens. Client records render contribution/approach/scope without an empty evidence section. LinkedIn and private location/immigration copy remain excluded.

See `DESIGN.md` for the authored presentation contract. The stale Impeccable sidecar is intentionally untouched.
