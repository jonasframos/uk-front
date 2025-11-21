export const AVAILABLE_INTEGRATIONS = [
  "OMNILINK",
  "ONIXSAT",
  "RODOPAG",
  "SASCAR"
]

export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/svg",
];

export const MacroStatusColor = {
  OK: "success",
  ALTERATION_REQUESTED: "warning",
  ALTERATION_PENDING: "warning",
  ALTERATION_APPROVED: "success",
  ALTERATION_REJECTED: "danger",
  LINKED: "linked",
  UNLINKED: "unlinked",
  MANUAL: "warning",
  DELETED: "danger",
} as const;

export const PayrollGroupStatus = {
  CLOSED: "CLOSED",
  CLOSING: "CLOSING",
  ERROR: "ERROR",
  OPEN: "OPEN",
  OPENING: "OPENING"
} as const;

export const MACRO_STATUS_OPTIONS = [
  { label: "Registro Original", value: "OK" },
  { label: "Alteração Solicitada", value: "ALTERATION_REQUESTED" },
  { label: "Alteração Pendente", value: "ALTERATION_PENDING" },
  { label: "Alteração Aprovada", value: "ALTERATION_APPROVED" },
  { label: "Alteração Rejeitada", value: "ALTERATION_REJECTED" },
  { label: "Vinculada", value: "LINKED" },
  { label: "Desvinculada", value: "UNLINKED" },
  { label: "Manual", value: "MANUAL" },
];

export const COMPENSATORY_TIME_CONSOLIDATED_CATEGORY_OPTIONS = [
  {
    label: "Hora Extra 50%",
    value: "EXTRA_HOUR_50",
  },
  {
    label: "Hora Extra 100%",
    value: "EXTRA_HOUR_100",
  }
];

export const COMPENSATORY_TIME_CATEGORY_OPTIONS = [
  {
    label: "Hora Extra 50%",
    value: "EXTRA_HOUR_50",
  },
  {
    label: "Hora Extra 100%",
    value: "EXTRA_HOUR_100",
  }
];

export const COMPENSATORY_TIME_JOURNEY_MODIFIER_CATEGORY_OPTIONS = [
  {
    label: "Hora Extra 100%",
    value: "EXTRA_HOUR_100",
  }
];

export const COMPENSATORY_TIME_TYPE_OPTIONS = [
  { label: "Crédito", value: "CREDIT" },
  { label: "Débito", value: "DEBIT" },
  { label: "Justificativa", value: "JUSTIFICATIVE" },
  { label: "Modificador de Jornada", value: "JOURNEY_MODIFIER" },
];

export const INFRACTION_DATE_TYPES = [
  { label: "Diário", value: "DAILY" },
  { label: "Mensal", value: "MONTHLY" }
];

export const REPORT_TYPES = [
  { label: "Macros Manuais", value: "MANUAL_MACROS" },
  { label: "Macros com Alteraçao", value: "ALTERED_MACROS" },
  { label: "Descanso Interjornada", value: "INTERJOURNEY" },
  { label: "Trabalho Ininterrupto", value: "LONGEST_WORKING_TIME" },
  { label: "Lista de Macros", value: "MACROS_LIST" },
];

export const REPORT_ORIENTATIONS = [
  { label: "Retrato", value: "portrait" },
  { label: "Paisagem", value: "landscape" },
];

export const INFRACTION_TYPES = [
  { label: "Macros Manuais", value: "MANUAL_MACRO", field: "manual_macro" },
  { label: "Macros Alteradas", value: "ALTERED_MACRO", field: "altered_macro"  },
  { label: "Interjornada", value: "INTERJOURNEY_TIME", field: "interjourney_time" },
  { label: "Refeição", value: "MEAL_TIME", field: "meal_time"  },
  { label: "Tempo de Direção", value: "LONG_WORKING_TIME", field: "long_working_time"  }
];

export const JOURNEY_CONTROL_TYPES = [
  { label: "Total de jornadas", value: "JOURNEYS", field: "journeys" },
  { label: "Colaboradores que não finalizaram jornada", value: "INCOMPLETE_JOURNEYS", field: "incomplete_journeys"  },
  { label: "Não aderência", value: "NOT_ADHESION", field: "not_adhesion" },
  { label: "Aderência", value: "ADHESION", field: "adhesion"  }
];

export const REASONS_BY_CATEGORY = {
  DEBIT: [
    { label: "Folga Compensatória", value: "COMPENSATORY_TIME_OFF" },
    { label: "Débito de Banco de Horas", value: "HOURS_BANK_DEBIT" },
    { label: "Descarga de Banco de Horas", value: "TIME_BANK_DISCHARGE" },
  ],
  CREDIT: [{ label: "Crédito de Banco de Horas", value: "HOURS_BANK_CREDIT" }],
  JUSTIFICATIVE: [
    { label: "Atestado Médico", value: "MEDICAL_CERTIFICATE" },
    { label: "Licença Paternidade", value: "PATERNITY_LEAVE" },
    { label: "Licença Matrimonial", value: "MARRIAGE_LICENSE" },
    { label: "Licença Funeral", value: "FUNERAL_LICENSE" },
    { label: "Férias", value: "VACATION" },
    { label: "Afastamento Médico", value: "MEDICAL_LEAVE" },
    { label: "Folga Semanal", value: "WEEKLY_DAY_OFF" },
    { label: "Folga", value: "DAY_OFF" },
    { label: "Descanso", value: "REST" },
    { label: "Admissional", value: "ADMISSION" },
    { label: "Demissional", value: "RESIGNATION" },
    { label: "Abono", value: "ALLOWANCE" },
    { label: "Período de Integração", value: "INTEGRATION_PERIOD" },
    { label: "Falta", value: "MISSING" },
    { label: "Virada de Dia", value: "DAY_CHANGE" },
    { label: "Motorista Interno", value: "INTERNAL_DRIVER" },
    { label: "Não Admitido", value: "NOT_ADMITTED" },
    { label: "Compensação de Banco de Horas", value: "HOUR_BANK_COMPENSATION" },
    { label: "-", value: "NO_REASON" },
    { label: "Débito de Banco de Horas", value: "HOUR_BANK_DEBIT" },
    { label: "Advertência", value: "WARNING" },
    { label: "Suspensão", value: "SUSPENSION" },
    { label: "Ônibus", value: "BUS" },
    { label: "Exame", value: "EXAMINATION" },
    { label: "Personalizado", value: "CUSTOM" }
  ],
  JOURNEY_MODIFIER: [
    { label: "Definição de DSR", value: "DSR_DEFINITION" },
  ]
};

export enum REASON_TYPE {
  COMPENSATORY_TIME_OFF = "COMPENSATORY_TIME_OFF",
  HOURS_BANK_DEBIT = "HOURS_BANK_DEBIT",
  TIME_BANK_DISCHARGE = "TIME_BANK_DISCHARGE",
  HOURS_BANK_CREDIT = "HOURS_BANK_CREDIT",
  MEDICAL_CERTIFICATE = "MEDICAL_CERTIFICATE",
  PATERNITY_LEAVE = "PATERNITY_LEAVE",
  MARRIAGE_LICENSE = "MARRIAGE_LICENSE",
  FUNERAL_LICENSE = "FUNERAL_LICENSE",
  VACATION = "VACATION",
  MEDICAL_LEAVE = "MEDICAL_LEAVE",
  WEEKLY_DAY_OFF = "WEEKLY_DAY_OFF",
  DAY_OFF = "DAY_OFF",
  REST = "REST",
  ADMISSION = "ADMISSION",
  RESIGNATION = "RESIGNATION",
  ALLOWANCE = "ALLOWANCE",
  INTEGRATION_PERIOD = "INTEGRATION_PERIOD",
  DSR_DEFINITION = "DSR_DEFINITION",
  MISSING = "MISSING",
  DAY_CHANGE = "DAY_CHANGE",
  HOUR_BANK_COMPENSATION = "HOUR_BANK_COMPENSATION",
  NO_REASON = "NO_REASON",
  HOUR_BANK_DEBIT = "HOUR_BANK_DEBIT",
  WARNING = "WARNING",
  SUSPENSION = "SUSPENSION",
  INTERNAL_DRIVER = "INTERNAL_DRIVER",
  NOT_ADMITTED = "NOT_ADMITTED",
  BUS = "BUS",
  EXAMINATION = "EXAMINATION",
  CUSTOM = "CUSTOM",
}

export enum REASON_NAME_BY_TYPE {
  COMPENSATORY_TIME_OFF = "Folga Compensatória",
  HOURS_BANK_DEBIT = "Débito de Banco de Horas",
  TIME_BANK_DISCHARGE = "Descarga de Banco de Horas",
  HOURS_BANK_CREDIT = "Crédito de Banco de Horas",
  MEDICAL_CERTIFICATE = "Atestado Médico",
  PATERNITY_LEAVE = "Licença Paternidade",
  MARRIAGE_LICENSE = "Licença Matrimonial",
  FUNERAL_LICENSE = "Licença Funeral",
  VACATION = "Férias",
  MEDICAL_LEAVE = "Afastamento Médico",
  WEEKLY_DAY_OFF = "Folga Semanal",
  DAY_OFF = "Folga",
  REST = "Descanso",
  ADMISSION = "Admissional",
  RESIGNATION = "Demissional",
  ALLOWANCE = "Abono",
  INTEGRATION_PERIOD = "Período de Integração",
  DSR_DEFINITION = "Definição de DSR",
  MISSING = "Falta",
  DAY_CHANGE = "Virada de Dia",
  HOUR_BANK_COMPENSATION = "Compensação de Banco de Horas",
  NO_REASON = "-",
  HOUR_BANK_DEBIT = "Débito de Banco de Horas",
  WARNING = "Advertência",
  SUSPENSION = "Suspensão",
  INTERNAL_DRIVER = "Motorista Interno",
  NOT_ADMITTED = "Não Admitido",
  BUS = "Ônibus",
  EXAMINATION = "Exame",
  CUSTOM = "Personalizado",
}

export const REASON_OPTIONS = [
  {value: "COMPENSATORY_TIME_OFF", label: "Folga Compensatória"},
  {value: "HOURS_BANK_DEBIT", label: "Débito de Banco de Horas"},
  {value: "TIME_BANK_DISCHARGE", label: "Descarga de Banco de Horas"},
  {value: "HOURS_BANK_CREDIT", label: "Crédito de Banco de Horas"},
  {value: "MEDICAL_CERTIFICATE", label: "Atestado Médico"},
  {value: "PATERNITY_LEAVE", label: "Licença Paternidade"},
  {value: "MARRIAGE_LICENSE", label: "Licença Matrimonial"},
  {value: "FUNERAL_LICENSE", label: "Licença Funeral"},
  {value: "VACATION", label: "Férias"},
  {value: "MEDICAL_LEAVE", label: "Afastamento Médico"},
  {value: "WEEKLY_DAY_OFF", label: "Folga Semanal"},
  {value: "DAY_OFF", label: "Folga"},
  {value: "REST", label: "Descanso"},
  {value: "ADMISSION", label: "Admissional"},
  {value: "RESIGNATION", label: "Demissional"},
  {value: "ALLOWANCE", label: "Abono"},
  {value: "INTEGRATION_PERIOD", label: "Período de Integração"},
  {value: "DSR_DEFINITION", label: "Definição de DSR"},
  {value: "MISSING", label: "Falta"},
  {value: "DAY_CHANGE", label: "Virada de Dia"},
  {value: "HOUR_BANK_COMPENSATION", label: "Compensação de Banco de Horas"},
  {value: "NO_REASON", label: "-"},
  {value: "HOUR_BANK_DEBIT", label: "Débito de Banco de Horas"},
  {value: "WARNING", label: "Advertência"},
  {value: "SUSPENSION", label: "Suspensão"},
  {value: "INTERNAL_DRIVER", label: "Motorista Interno"},
  {value: "NOT_ADMITTED", label: "Não Admitido"},
  {value: "BUS", label: "Ônibus"},
  {value: "EXAMINATION", label: "Exame"},
  {value: "CUSTOM", label: "Personalizado"},
]

export const LAYOUT_COLUMNS_OPTIONS = [
  { type: "JOURNEY", name: "Jornada" },
  { type: "WORKED", name: "Trabalhadas" },
  { type: "AVAILABLE", name: "Disposição" },
  { type: "WAITING", name: "Em Espera" },
  { type: "WORKED_AVAILABLE", name: "Jornada Total" },
  { type: "MISSING", name: "H.F." },
  { type: "HE50_DAY", name: "H.E 50% - Diur" },
  { type: "HE50_NIGHT", name: "H.E 50% - Not" },
  { type: "HE50", name: "H.E 50%" },
  { type: "HE60_DAY", name: "H.E 60% - Diur" },
  { type: "HE60_NIGHT", name: "H.E 60% - Not" },
  { type: "HE60", name: "H.E 60%" },
  { type: "HE100_HOLIDAY_DAY", name: "H.E 100% Feriado - Diur" },
  { type: "HE100_HOLIDAY_NIGHT", name: "H.E 100% Feriado - Not" },
  { type: "HE100_HOLIDAY", name: "H.E 100% Feriado" },
  { type: "HE100_DSR_DAY", name: "H.E 100% DSR - Diur" },
  { type: "HE100_DSR_NIGHT", name: "H.E 100% DSR - Not" },
  { type: "HE100_DSR", name: "H.E 100% DSR" },
  { type: "NIGHT_ADDITIONAL", name: "A.N." },
  { type: "DRIVING_REST_TIME", name: "Descanso Direção" },
  { type: "INTRAJOURNEY_START", name: "Refeição - Início" },
  { type: "INTRAJOURNEY_END", name: "Refeição - Fim" },
  { type: "INTRAJOURNEY_TIME", name: "Refeição - Duração" },
  { type: "INTERJOURNEY_TIME", name: "Interjornada (Pernoite)" },
  { type: "INTERJOURNEY_COMPENSATION_TIME", name: "Comp. Interjornada" }
];

export const LAYOUT_TOTALIZERS_OPTIONS = [
  { type: "HE50_DAY", name: "HE50% Diurno" },
  { type: "HE50_NIGHT", name: "HE50% Noturno" },
  { type: "HE50", name: "H.E 50%" },
  { type: "HE60_DAY", name: "HE60% Diurno" },
  { type: "HE60_NIGHT", name: "HE60% Noturno" },
  { type: "HE60", name: "H.E 60%" },
  { type: "HE100_HOLIDAY_DAY", name: "H.E 100% Feriado - Diur" },
  { type: "HE100_HOLIDAY_NIGHT", name: "H.E 100% Feriado - Not" },
  { type: "HE100_HOLIDAY", name: "H.E 100% Feriado" },
  { type: "HE100_DSR_DAY", name: "H.E 100% DSR - Diur" },
  { type: "HE100_DSR_NIGHT", name: "H.E 100% DSR - Not" },
  { type: "HE100_DSR", name: "H.E 100% DSR" },
  { type: "NIGHT_ADDITIONAL", name: "Adicional Noturno" },
  { type: "HE50_INTRAJOURNEY", name: "Indeniz. Inter. Jor." },
  { type: "HE50_INTERJOURNEY", name: "Indeniz. Intra. Jor." },
  { type: "MISSING_HOURS", name: "Horas Faltantes" },
  { type: "WAITING", name: "Horas Em Espera" },
  { type: "HOUR_BANK_LAST_MONTH", name: "Saldo do Mês Anterior" },
  { type: "CREDIT", name: "Crédito na Competência" },
  { type: "DEBIT", name: "Débito na Competência" },
  { type: "HOUR_BANK_PAID", name: "Pagamento de Saldo de Banco" },
  { type: "HOUR_BANK_CREDIT", name: "Crédito de Saldo de Banco" },
  { type: "HOUR_BANK_CURRENT", name: "Saldo Atual" },
  { type: "HOUR_BANK_SETTLED", name: "Saldo Quitado" },
];

export const MACRO_ORIGIN_OPTIONS = [
  { label: "JORNADASAT", value: "JORNADASAT" },
  { label: "ONIXSAT", value: "ONIXSAT" },
  { label: "SASCAR", value: "SASCAR" },
  { label: "OMNILINK", value: "OMNILINK" },
  { label: "RODOPAG", value: "RODOPAG" }
];

export const MACRO_REASON_OPTIONS = [
  {
    label: "Esqueceu de Registrar",
    value: "FORGOT_TO_REGISTER",
  },
  {
    label: "Problema no Dispositivo",
    value: "DEVICE_PROBLEM",
  },
];

export const MACRO_REMOVE_REASON_OPTIONS = [
  {
    label: "Marcação Incorreta",
    value: "WRONG_MARKING",
  },
  {
    label: "Ajuste de Jornada",
    value: "JOURNEY_ADJUSTMENT",
  },
  {
    label: "Erro de Parametrização",
    value: "PARAMETERS_MISTAKE",
  },
];

export enum MACRO_REASON_TYPE {
  FORGOT_TO_REGISTER = "FORGOT_TO_REGISTER",
  DEVICE_PROBLEM = "DEVICE_PROBLEM",
}

export enum COMPENSATORY_TIME_TYPE {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
  JUSTIFICATIVE = "JUSTIFICATIVE",
  JOURNEY_MODIFIER = "JOURNEY_MODIFIER",
}

export enum COMPENSATORY_TIME_TYPE_TRANSLATION {
  DEBIT = "Débito",
  CREDIT = "Crédito",
  JUSTIFICATIVE = "Justificativa",
  JOURNEY_MODIFIER = "Modificador de Jornada",
}

export enum COMPENSATORY_TIME_TYPE_STATUS_COLOR {
  DEBIT = "success",
  CREDIT = "warning",
  JUSTIFICATIVE = "danger",
  JOURNEY_MODIFIER = "linked",
}

export enum COMPENSATORY_TIME_REGISTER_TYPE {
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
}

export enum COMPENSATORY_TIME_REGISTER_TYPE_STATUS_COLOR {
  MANUAL = "warning",
  AUTOMATIC = "linked",
}
