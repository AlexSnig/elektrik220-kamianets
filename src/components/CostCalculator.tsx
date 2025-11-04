import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, Zap, Lightbulb, Cable, DollarSign, CheckCircle, Info } from 'lucide-react';

interface CalculatorInputs {
  outlets: number;
  lightFixtures: number;
  wireLength: number;
  workType: 'installation' | 'replacement' | 'repair';
}

interface CostBreakdown {
  outlets: number;
  lightFixtures: number;
  wiring: number;
  baseCallout: number;
  total: number;
}

const CostCalculator: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const prefersReducedMotion = useReducedMotion();

  const [inputs, setInputs] = useState<CalculatorInputs>({
    outlets: 0,
    lightFixtures: 0,
    wireLength: 0,
    workType: 'installation',
  });

  const [showResult, setShowResult] = useState(false);
  const [cost, setCost] = useState<CostBreakdown>({
    outlets: 0,
    lightFixtures: 0,
    wiring: 0,
    baseCallout: 300,
    total: 300,
  });

  // Pricing configuration
  const pricing = {
    installation: {
      outlet: 250,
      lightFixture: 350,
      wirePerMeter: 80,
    },
    replacement: {
      outlet: 200,
      lightFixture: 300,
      wirePerMeter: 70,
    },
    repair: {
      outlet: 150,
      lightFixture: 200,
      wirePerMeter: 50,
    },
  };

  const workTypeLabels = {
    installation: 'Встановлення нових',
    replacement: 'Заміна існуючих',
    repair: 'Ремонт/Діагностика',
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateCost = () => {
    const prices = pricing[inputs.workType];

    const outletsCost = inputs.outlets * prices.outlet;
    const lightsCost = inputs.lightFixtures * prices.lightFixture;
    const wiringCost = inputs.wireLength * prices.wirePerMeter;
    const baseCallout = 300;

    const breakdown: CostBreakdown = {
      outlets: outletsCost,
      lightFixtures: lightsCost,
      wiring: wiringCost,
      baseCallout,
      total: outletsCost + lightsCost + wiringCost + baseCallout,
    };

    setCost(breakdown);
    setShowResult(true);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCost();
  };

  const hasAnyInput = inputs.outlets > 0 || inputs.lightFixtures > 0 || inputs.wireLength > 0;

  return (
    <section
      id="calculator"
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="calculator-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-6 shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 id="calculator-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Калькулятор вартості робіт
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Отримайте орієнтовну вартість електромонтажних робіт за лічені секунди
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
                <form onSubmit={handleCalculate} className="space-y-6">
                  {/* Work Type */}
                  <div>
                    <label htmlFor="workType" className="block text-sm font-semibold text-gray-900 mb-3">
                      Тип робіт
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {(Object.keys(workTypeLabels) as Array<keyof typeof workTypeLabels>).map((type) => (
                        <label
                          key={type}
                          className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            inputs.workType === type
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="workType"
                            value={type}
                            checked={inputs.workType === type}
                            onChange={(e) => handleInputChange('workType', e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium text-gray-900">{workTypeLabels[type]}</span>
                            {inputs.workType === type && (
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Outlets */}
                  <div>
                    <label htmlFor="outlets" className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                      <Zap className="w-4 h-4 mr-2 text-orange-500" />
                      Кількість розеток
                    </label>
                    <input
                      type="number"
                      id="outlets"
                      name="outlets"
                      min="0"
                      max="100"
                      value={inputs.outlets || ''}
                      onChange={(e) => handleInputChange('outlets', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                      placeholder="0"
                    />
                    <p className="mt-1 text-xs text-gray-600">
                      {pricing[inputs.workType].outlet} грн за розетку
                    </p>
                  </div>

                  {/* Light Fixtures */}
                  <div>
                    <label htmlFor="lightFixtures" className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                      <Lightbulb className="w-4 h-4 mr-2 text-orange-500" />
                      Кількість світильників
                    </label>
                    <input
                      type="number"
                      id="lightFixtures"
                      name="lightFixtures"
                      min="0"
                      max="100"
                      value={inputs.lightFixtures || ''}
                      onChange={(e) => handleInputChange('lightFixtures', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                      placeholder="0"
                    />
                    <p className="mt-1 text-xs text-gray-600">
                      {pricing[inputs.workType].lightFixture} грн за світильник
                    </p>
                  </div>

                  {/* Wire Length */}
                  <div>
                    <label htmlFor="wireLength" className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                      <Cable className="w-4 h-4 mr-2 text-orange-500" />
                      Довжина проводки (метри)
                    </label>
                    <input
                      type="number"
                      id="wireLength"
                      name="wireLength"
                      min="0"
                      max="1000"
                      value={inputs.wireLength || ''}
                      onChange={(e) => handleInputChange('wireLength', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                      placeholder="0"
                    />
                    <p className="mt-1 text-xs text-gray-600">
                      {pricing[inputs.workType].wirePerMeter} грн за метр
                    </p>
                  </div>

                  {/* Calculate Button */}
                  <motion.button
                    type="submit"
                    disabled={!hasAnyInput}
                    className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all ${
                      hasAnyInput
                        ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:shadow-xl hover:scale-[1.02]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    whileHover={hasAnyInput ? { scale: 1.02 } : {}}
                    whileTap={hasAnyInput ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Calculator className="w-5 h-5" />
                      <span>Розрахувати вартість</span>
                    </div>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 sm:p-8 text-white h-full">
                {showResult && hasAnyInput ? (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <DollarSign className="w-8 h-8" />
                      <h3 className="text-2xl font-bold">Розрахунок вартості</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Breakdown */}
                      {cost.outlets > 0 && (
                        <div className="flex justify-between items-center pb-3 border-b border-blue-400/30">
                          <div className="flex items-center space-x-2">
                            <Zap className="w-5 h-5" />
                            <span>Розетки ({inputs.outlets} шт)</span>
                          </div>
                          <span className="font-semibold">{cost.outlets} грн</span>
                        </div>
                      )}

                      {cost.lightFixtures > 0 && (
                        <div className="flex justify-between items-center pb-3 border-b border-blue-400/30">
                          <div className="flex items-center space-x-2">
                            <Lightbulb className="w-5 h-5" />
                            <span>Світильники ({inputs.lightFixtures} шт)</span>
                          </div>
                          <span className="font-semibold">{cost.lightFixtures} грн</span>
                        </div>
                      )}

                      {cost.wiring > 0 && (
                        <div className="flex justify-between items-center pb-3 border-b border-blue-400/30">
                          <div className="flex items-center space-x-2">
                            <Cable className="w-5 h-5" />
                            <span>Проводка ({inputs.wireLength} м)</span>
                          </div>
                          <span className="font-semibold">{cost.wiring} грн</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center pb-4 border-b border-blue-400/30">
                        <span>Виїзд майстра</span>
                        <span className="font-semibold">{cost.baseCallout} грн</span>
                      </div>

                      {/* Total */}
                      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl p-4 mt-6 shadow-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold">Загальна вартість:</span>
                          <span className="text-3xl font-bold">{cost.total} грн</span>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-white/10 rounded-xl p-4 mt-6">
                      <div className="flex items-start space-x-2">
                        <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-100">
                          Це орієнтовний розрахунок. Остаточна вартість визначається після огляду об'єкта майстром.
                          Ціни можуть змінюватися залежно від складності робіт та використаних матеріалів.
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.a
                      href="tel:+380677523103"
                      className="block w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white text-center py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all mt-6"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Викликати майстра зараз
                    </motion.a>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Calculator className="w-12 h-12 text-orange-300" />
                    </div>
                    <h3 className="text-2xl font-bold">Почніть розрахунок</h3>
                    <p className="text-blue-100">
                      Введіть дані в форму зліва, щоб отримати орієнтовну вартість робіт
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Що входить у вартість:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Робота кваліфікованого електрика</li>
                  <li>• Діагностика та консультація</li>
                  <li>• Встановлення/заміна обладнання</li>
                  <li>• Гарантія на виконані роботи 3 роки</li>
                  <li>• Матеріали розраховуються окремо або надаються замовником</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
