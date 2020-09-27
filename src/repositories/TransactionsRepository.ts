import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
     const transactions = await this.find();

    const filteredIncome = transactions.filter((transaction) => {
      return transaction.type === 'income';
    })

    const filteredOutcome = transactions.filter((transaction) => {
      return transaction.type === 'outcome';
    })

    const totalIncome = filteredIncome.reduce( (accumulator1, elem) => {
      return (accumulator1 += Number(elem.value))
    }, 0)

    const totalOutcome = filteredOutcome.reduce( (accumulator2, elem) => {
      return (accumulator2 += Number(elem.value))
    }, 0)

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    }
  }
}

export default TransactionsRepository;
