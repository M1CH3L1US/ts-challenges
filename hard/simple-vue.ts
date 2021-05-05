type VueComponentDef = any;
type FunctionReturnType<T> = T extends (...args: any) => infer R ? R : T;
type ObjectWithThisContext<Ctx, O> = {
  [P in keyof O]: O[P] extends (...args: any) => infer R
    ? (this: Ctx) => R
    : O[P];
};
type ResolveObjectFunctions<T extends Object> = {
  [P in keyof T]: T[P] extends () => infer R ? R : T[P];
};
type VueComponentOptions<
  D,
  C,
  M,
  Ctx = FunctionReturnType<D> & ResolveObjectFunctions<C> & M
> = {
  data: D;
  computed: ObjectWithThisContext<Ctx, C>;
  methods: ObjectWithThisContext<Ctx, M>;
};

declare function SimpleVue<D extends () => Object, C, M>(
  componentDef: VueComponentOptions<D, C, M>
): VueComponentDef;

SimpleVue({
  data() {
    return { Beep: "Boop" };
  },
  computed: {
    message() {
      return this.Beep + " <3";
    },
  },
  methods: {
    beep() {
      console.log(this.message);
    },
  },
});
