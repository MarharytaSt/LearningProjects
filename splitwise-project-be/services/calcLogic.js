export function recalculateAccount(account) {
    const participants = account.participants;
    const total = participants
        .flatMap(p => p.transactions || [])
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    account.total = total;

    const count = participants.length;

    for (const p of participants) {
        p.paid = (p.transactions || []).reduce((s, t) => s + t.amount, 0);
    }

    for (const p of participants) {
        if (account.splitType === "equally") {
            p.owed = total / count;
        } else if (account.splitType === "shares") {
            p.owed = total * (p.share || 0);
        }
    }

    for (const p of participants) {
        p.balance = p.paid - p.owed;
    }

    const debtors = participants
        .filter(p => p.balance < 0)
        .map(p => ({ ...p, balance: Math.abs(p.balance) }));

    const creditors = participants
        .filter(p => p.balance > 0)
        .map(p => ({ ...p }));

    const debts = [];

    for (const debtor of debtors) {
        for(const creditor of creditors) {
            if (debtor.balance <= 0) break;
            if (creditor.balance <= 0) continue;

            const amount = Math.min(debtor.balance, creditor.balance);

            debts.push({
                from: debtor.name,
                to: creditor.name,
                amount: Number(amount.toFixed(2))
            });

            debtor.balance -= amount;
            creditor.balance -= amount;

        }
    }

    account.debts = debts;

    return account;

}