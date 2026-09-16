/**
 * Side-by-side comparison for a panel page.
 *
 * Deliberately does NOT name a competitor. Three reasons, and they are all
 * commercial rather than squeamish:
 *
 * 1. Randox is our SUPPLIER as well as our closest price comparator. Naming
 *    them adversarially on our own product pages is not a fight worth picking
 *    with the laboratory that runs our bloods.
 * 2. Competitor prices move. A named price printed on our page becomes a false
 *    claim the moment they change it, and nobody will notice for months.
 * 3. The CAP Code requires comparative claims to be accurate and verifiable and
 *    to compare like with like. A hedged claim about the typical market is
 *    defensible and needs no monitoring; "Randox charges £416" needs both.
 *
 * Every row in the `rows` array must stay true of the typical direct to
 * consumer panel. Hedged wording ("often", "usually", "commonly extra") is
 * correct here and is not weasel wording: it is what makes the claim accurate.
 */

type Row = {
  feature: string;
  /** true renders a tick, a string renders that text. */
  ours: boolean | string;
  theirs: boolean | string;
};

const Mark = ({ val }: { val: boolean | string }) => {
  if (val === true) {
    return (
      <span aria-label="Included" style={{ color: "var(--go)", fontWeight: 700, fontSize: "1.05rem" }}>
        ✓
      </span>
    );
  }
  if (val === false) {
    return (
      <span aria-label="Not included" style={{ color: "var(--sl3)", fontSize: "1.05rem" }}>
        &ndash;
      </span>
    );
  }
  return <span style={{ fontSize: ".82rem", color: "var(--sl2)", lineHeight: 1.5 }}>{val}</span>;
};

export default function PanelComparison({
  ourLabel,
  ourPrice,
  rows,
  footnote,
}: {
  ourLabel: string;
  ourPrice: string;
  rows: Row[];
  footnote?: string;
}) {
  return (
    <div style={{ margin: "36px 0" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left", padding: "12px 14px", fontSize: ".72rem", fontWeight: 600,
                  letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)",
                  borderBottom: "2px solid var(--iv3)", width: "46%",
                }}
              >
                What you get
              </th>
              <th
                style={{
                  textAlign: "center", padding: "12px 14px", fontSize: ".72rem", fontWeight: 700,
                  letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fo)",
                  borderBottom: "2px solid var(--go)", whiteSpace: "pre-line",
                }}
              >
                {`${ourLabel}\n${ourPrice}`}
              </th>
              <th
                style={{
                  textAlign: "center", padding: "12px 14px", fontSize: ".72rem", fontWeight: 600,
                  letterSpacing: ".08em", textTransform: "uppercase", color: "var(--sl3)",
                  borderBottom: "2px solid var(--iv3)", whiteSpace: "pre-line",
                }}
              >
                {"Typical online\nblood test"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.feature} style={{ background: idx % 2 === 0 ? "var(--wh)" : "var(--iv)" }}>
                <td style={{ padding: "12px 14px", fontSize: ".86rem", color: "var(--sl2)", lineHeight: 1.6 }}>
                  {row.feature}
                </td>
                <td style={{ padding: "12px 14px", textAlign: "center" }}>
                  <Mark val={row.ours} />
                </td>
                <td style={{ padding: "12px 14px", textAlign: "center" }}>
                  <Mark val={row.theirs} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && (
        <p style={{ fontSize: ".76rem", color: "var(--sl3)", lineHeight: 1.7, marginTop: 12 }}>
          {footnote}
        </p>
      )}
    </div>
  );
}
