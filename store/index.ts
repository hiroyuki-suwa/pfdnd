import { computed, ComputedRef, inject, InjectionKey, provide, Ref, ref } from 'vue'

const USE_STORE: InjectionKey<UseStore> = Symbol('USE_STORE')

type UseStore = {
  x: Ref<number>
  y: Ref<number>
  z: Ref<number>
  Vx: Ref<number>
  Vy: Ref<number>
  Vz: Ref<number>
  V: ComputedRef<number>
  Vxy: ComputedRef<number>
  gs: ComputedRef<number>
  tas: ComputedRef<number>
  ias: ComputedRef<number>
  gForce: ComputedRef<number>
  inHg: Ref<number>
  alt: ComputedRef<number>
  vs: ComputedRef<number>
  pitch: Ref<number>
  bank: Ref<number>
  heading: Ref<number>
  tracking: ComputedRef<number>
  aoa: ComputedRef<number>
  glide: ComputedRef<number>
  elevator: Ref<number>
  aileron: Ref<number>
  rudder: Ref<number>
  stabTrim: Ref<number>
  targetElevator: Ref<number>
  targetAileron: Ref<number>
  targetRudder: Ref<number>
  N1Left: Ref<number>
  N1Right: Ref<number>
  N2Left: Ref<number>
  N2Right: Ref<number>
  throttleLeft: Ref<number>
  throttleRight: Ref<number>
  targetThrottleLeft: Ref<number>
  targetThrottleRight: Ref<number>
  targetN2Left: Ref<number>
  targetN2Right: Ref<number>
  MAX_POWER: number
  MIN_POWER: number
  engagedAp: Ref<boolean>
  engagedHdg: Ref<boolean>
  engagedAlt: Ref<boolean>
  engagedVs: Ref<boolean>
  engagedIas: Ref<boolean>
  cmdHdg: Ref<number>
  cmdAlt: Ref<number>
  cmdVs: Ref<number>
  cmdIas: Ref<number>
  controlAircraft: () => void;
}

// physical constants
const GRAVITY = 9.8 // m/s^2
const RHO = 1.225 // kg/m^3

// aircraft data
const MASS = 60000 // mass of the aircraft in kg
const S = 125 // area of the wings in m^2
const MAX_AOA = 18 // degrees
const MIN_AOA = -10 // degrees
const MAX_CL = 2.1 // lift coefficient at max AOA
const MIN_CL = -.7 // lift coefficient at min AOA
const MAX_THRUST = 120000 // max thrust of the engines in Newtons
const MAX_POWER = 1.08 // max N1 of the engines
const MIN_POWER = 0.12 // min N1 of the engines
const STANDARD_SPEED = 100 // m/s
const STANDARD_ROLLING_RATE = Math.PI / 3 // rad/s
const STANDARD_PITCHING_RATE = Math.PI / 4 // rad/s
const STANDARD_YAWING_RATE = Math.PI / 4 // rad/s
const STANDARD_DRIFTING_RATE = Math.PI / 4 // rad/s

// utility functions
const toRad = (deg: number) => deg * Math.PI / 180 // degrees to radians
const toDeg = (rad: number) => rad * 180 / Math.PI // radians to degrees
const innerProduct = (a: number[], b: number[]) => a.reduce((acc, cur, i) => acc + cur * b[i], 0)
const matrixProduct = (a: number[][], b: number[][]) => a.map((row) => b[0].map((_, i) => innerProduct(row, b.map((col) => col[i]))))
const transposeMatrix = (a: number[][]) => a[0].map((_, i) => a.map((row) => row[i]))
const matrixToFixedAngles = (R: number[][]) => {
  const [R11, R12, R13] = R[0]
  const [R21, R22, R23] = R[1]
  const [R31, R32, R33] = R[2]
  const phi = Math.atan2(R32, R33)
  const theta = Math.asin(-R31)
  const psi = Math.atan2(R21, R11)
  return [phi, theta, psi]
}
const fixedAnglesToMatrix = (phi: number, theta: number, psi: number) => {
  const [cphi, sphi] = [Math.cos(phi), Math.sin(phi)]
  const [ctheta, stheta] = [Math.cos(theta), Math.sin(theta)]
  const [cpsi, spsi] = [Math.cos(psi), Math.sin(psi)]
  return [
    [cpsi * ctheta, cpsi * stheta * sphi - spsi * cphi, cpsi * stheta * cphi + spsi * sphi],
    [spsi * ctheta, spsi * stheta * sphi + cpsi * cphi, spsi * stheta * cphi - cpsi * sphi],
    [-stheta, ctheta * sphi, ctheta * cphi],
  ]
}

const useStore = (fps = 50) => {
  const dt = 1 / fps

  // density of atomosphere in kg/m^3
  const rho = computed(() => RHO * Math.exp(z.value / 8000))

  // ------------------------------------
  // state - position
  // ------------------------------------
  const x = ref(0) // x position in meters
  const y = ref(0) // y position in meters
  const z = ref(0) // z position in meters
  const inHg = ref(29.92) // pressure in inches of mercury
  const alt = computed(() => -z.value * 3.28084 + (inHg.value - 29.92) * 1000) // altitude in feet

  // ------------------------------------
  // state - velocity
  // ------------------------------------
  const Vx = ref(0) // velocity to North in m/s
  const Vy = ref(0) // velocity to East in m/s
  const Vz = ref(0) // velocity to Up in m/s
  const V = computed(() => Math.sqrt(Vx.value ** 2 + Vy.value ** 2 + Vz.value ** 2)) // velocity in m/s
  const Vxy = computed(() => Math.sqrt(Vx.value ** 2 + Vy.value ** 2)) // lateral velocity in m/s
  const gs = computed(() => Vxy.value * 1.94384) // ground speed in knots
  const tas = computed(() => V.value * 1.94384) // true airspeed in knots
  const ias = computed(() => V.value * 1.94384 * Math.sqrt(rho.value / RHO)) // indicated airspeed in knots
  const vs = computed(() => -Vz.value * 196.85) // vertical speed in feet per minute

  // ------------------------------------
  // state - attitude
  // ------------------------------------
  const bank = ref(0) // bank angle in degrees
  const pitch = ref(0) // pitch angle in degrees
  const heading = ref(0) // heading in degrees
  const phi = computed(() => toRad(bank.value)) // bank angle in radians
  const theta = computed(() => toRad(pitch.value)) // pitch angle in radians
  const psi = computed(() => toRad(heading.value)) // heading angle in radians
  const R = computed(() => fixedAnglesToMatrix(phi.value, theta.value, psi.value)) // rotation matrix

  // vectors
  const nose = computed(() => transposeMatrix(matrixProduct(R.value, [[1], [0], [0]]))[0]) // nose vector
  const right = computed(() => transposeMatrix(matrixProduct(R.value, [[0], [1], [0]]))[0]) // right vector
  const down = computed(() => transposeMatrix(matrixProduct(R.value, [[0], [0], [1]]))[0]) // down vector
  const Vnose = computed(() => innerProduct([Vx.value, Vy.value, Vz.value], nose.value)) // nose velocity in m/s
  const Vright = computed(() => innerProduct([Vx.value, Vy.value, Vz.value], right.value)) // right velocity in m/s
  const Vdown = computed(() => innerProduct([Vx.value, Vy.value, Vz.value], down.value)) // down velocity in m/s

  // tracking angle in degrees
  const tracking = computed(() => {
    if (Vxy.value === 0) return 0
    if (Vx.value === 0) return Vy.value > 0 ? 90 : 270
    if (Vx.value > 0) return toDeg(Math.atan(Vy.value / Vx.value))
    return toDeg(Math.atan(Vy.value / Vx.value)) + 180
  })

  // angle of attack in radians
  const alpha = computed(() => {
    if (Vnose.value === 0) return 0
    if (Vnose.value > 0) return Math.atan2(Vdown.value, Vnose.value)
    return Math.atan2(Vdown.value, Vnose.value) + Math.PI
  })
  const sinAlpha = computed(() => Math.sin(alpha.value)) // sin of angle of attack
  const aoa = computed(() => toDeg(alpha.value)) // angle of attack in degrees
  const glide = computed(() => toDeg(Math.atan2(-Vz.value, Vxy.value))) // glide angle in degrees

  // sideslip angle
  const gamma = computed(() => Math.atan2(Vright.value, Vnose.value)) // sideslip angle in radians
  const sinGamma = computed(() => Math.sin(gamma.value)) // sine of the sideslip angle

  // ------------------------------------
  // state - engine
  // ------------------------------------
  const N1Left = ref(0) // engine power: 1 = 100%
  const N1Right = ref(0) // engine power: 1 = 100%
  const N2Left = ref(0) // engine power: 1 = 100%
  const N2Right = ref(0) // engine power: 1 = 100%

  // ------------------------------------
  // state - control
  // ------------------------------------
  const elevator = ref(0) // elevator deflection: -1 to 1
  const aileron = ref(0) // aileron deflection: -1 to 1
  const rudder = ref(0) // rudder deflection: -1 to 1
  const stabTrim = ref(3) // stab trim: angle in degrees
  const targetElevator = ref(0) // target elevator deflection: -1 to 1
  const targetAileron = ref(0) // target aileron deflection: -1 to 1
  const targetRudder = ref(0) // target rudder deflection: -1 to 1
  const throttleLeft = ref(0) // throttle deflection: 0 to 1
  const throttleRight = ref(0) // throttle deflection: 0 to 1
  const targetThrottleLeft = ref(.8) // target throttle deflection: 0 to 1
  const targetThrottleRight = ref(.8) // target throttle deflection: 0 to 1
  const targetN2Left = computed(() => MIN_POWER + (MAX_POWER - MIN_POWER) * throttleLeft.value) // target N2
  const targetN2Right = computed(() => MIN_POWER + (MAX_POWER - MIN_POWER) * throttleRight.value) // target N2

  // ------------------------------------
  // simulation - attitude
  // ------------------------------------
  const updateAttitude = () => {
    if (z.value > 1 && pitch.value < 0) {
      bank.value = 0
      pitch.value = 0
      return
    }

    const dPhi = dt * (Vnose.value / STANDARD_SPEED) ** 2 * rho.value / RHO * (aileron.value * STANDARD_ROLLING_RATE)
    const dTheta = dt * (Vnose.value / STANDARD_SPEED) ** 2 * rho.value / RHO * (elevator.value * STANDARD_PITCHING_RATE - Math.sin(alpha.value - toRad(stabTrim.value)) * STANDARD_DRIFTING_RATE)
    const dPsi = dt * (Vnose.value / STANDARD_SPEED) ** 2 * rho.value / RHO * (rudder.value * STANDARD_YAWING_RATE + sinGamma.value * STANDARD_DRIFTING_RATE)
    const dR = fixedAnglesToMatrix(dPhi, dTheta, dPsi)
    const Rnew = matrixProduct(R.value, dR)
    const [phiNew, thetaNew, psiNew] = matrixToFixedAngles(Rnew)
    bank.value = toDeg(phiNew)
    pitch.value = toDeg(thetaNew)
    heading.value = toDeg(psiNew)
  }

  // ------------------------------------
  // simulation - engine
  // ------------------------------------
  const updateThrust = () => {
    const N1_SENSITIVITY = .2
    const N2_SENSITIVITY = 1

    const diffN2Left = targetN2Left.value - N2Left.value
    if (diffN2Left > N2_SENSITIVITY) N2Left.value += N2_SENSITIVITY * dt || 0
    else if (diffN2Left < -N2_SENSITIVITY) N2Left.value += -N2_SENSITIVITY * dt || 0
    else N2Left.value += diffN2Left * dt || 0

    const diffN2Right = targetN2Right.value - N2Right.value
    if (diffN2Right > N2_SENSITIVITY) N2Right.value += N2_SENSITIVITY * dt || 0
    else if (diffN2Right < -N2_SENSITIVITY) N2Right.value += -N2_SENSITIVITY * dt || 0
    else N2Right.value += diffN2Right * dt || 0

    const diffN1Left = N2Left.value - N1Left.value
    if (diffN1Left > N1_SENSITIVITY) N1Left.value += N1_SENSITIVITY * dt || 0
    else if (diffN1Left < -N1_SENSITIVITY) N1Left.value += -N1_SENSITIVITY * dt || 0
    else N1Left.value += diffN1Left * dt || 0

    const diffN1Right = N2Right.value - N1Right.value
    if (diffN1Right > N1_SENSITIVITY) N1Right.value += N1_SENSITIVITY * dt || 0
    else if (diffN1Right < -N1_SENSITIVITY) N1Right.value += -N1_SENSITIVITY * dt || 0
    else N1Right.value += diffN1Right * dt || 0
  }
  const updateState = () => {
    updateAttitude()
    updateThrust()
  }

  // ------------------------------------
  // simulation - position and velocity
  // ------------------------------------
  // lift force in Newtons
  const lift = computed(() => {
    let CL: number
    if (aoa.value < MIN_AOA) CL = 0
    else if (aoa.value < MAX_AOA) CL = MIN_CL + (MAX_CL - MIN_CL) * (aoa.value - MIN_AOA) / (MAX_AOA - MIN_AOA)
    else CL = 0
    return .5 * rho.value * Vnose.value ** 2 * S * CL
  })

  // drag force in Newtons
  const drag = computed(() => {
    const CD0 = 0.03
    const CDa = 0.30
    const CD = Math.min(MAX_CL, CD0 + CDa * alpha.value ** 2)
    return .5 * rho.value * Vnose.value ** 2 * S * CD
  })

  // thrust in Newtons
  const thrust = computed(() => {
    const thrustLeft = N1Left.value * MAX_THRUST
    const thrustRight = N1Right.value * MAX_THRUST
    return thrustLeft + thrustRight
  })

  // gravity in Newtons
  const weight = computed(() => MASS * GRAVITY)

  const L = computed(() => transposeMatrix(matrixProduct(R.value, [[0], [0], [-lift.value]]))[0]) // lift vector
  const D = computed(() => transposeMatrix(matrixProduct(R.value, [[-drag.value], [0], [0]]))[0]) // drag vector
  const T = computed(() => transposeMatrix(matrixProduct(R.value, [[thrust.value], [0], [0]]))[0]) // thrust vector
  const W = computed(() => [0, 0, weight.value]) // weight vector

  const Fx = computed(() => L.value[0] + D.value[0] + T.value[0] + W.value[0]) // force to North in Newtons
  const Fy = computed(() => L.value[1] + D.value[1] + T.value[1] + W.value[1]) // force to East in Newtons
  const Fz = computed(() => L.value[2] + D.value[2] + T.value[2] + W.value[2]) // force to Up in Newtons

  const Ax = computed(() => Fx.value / MASS) // acceleration to North in m/s^2
  const Ay = computed(() => Fy.value / MASS) // acceleration to East in m/s^2
  const Az = computed(() => Fz.value / MASS) // acceleration to Up in m/s^2
  const gForce = computed(() => Math.sqrt(Ax.value ** 2 + Ay.value ** 2 + (Az.value - GRAVITY) ** 2)  / GRAVITY) // g-force

  const updatePositionAndVelocity = () => {
    if (z.value > 0) {
      z.value = 0;
      Vz.value = 0;
      return;
    }
    Vx.value += Ax.value * dt || 0
    Vy.value += Ay.value * dt || 0
    Vz.value += z.value > -1 ? Math.min(z.value, Az.value * dt) : Az.value * dt || 0
    x.value += Vx.value * dt || 0
    y.value += Vy.value * dt || 0
    z.value += Vz.value * dt || 0
  }

  // ------------------------------------
  // simulation - control
  // ------------------------------------
  const updateElevator = () => {
    if (targetElevator.value === 0) {
      elevator.value /= 1.1
      return
    }

    const ELEVATOR_SENSITIVITY = .5
    const ELEVATOR_THRESHOLD = .1
    const diffElevator = targetElevator.value - elevator.value
    if (diffElevator > ELEVATOR_THRESHOLD) elevator.value += ELEVATOR_SENSITIVITY * dt || 0
    else if (diffElevator < -ELEVATOR_THRESHOLD) elevator.value += -ELEVATOR_SENSITIVITY * dt || 0
    else elevator.value += diffElevator * dt || 0
  }

  const updateAileron = () => {
    if (targetAileron.value === 0) {
      aileron.value /= 1.1
      return
    }

    const AILERON_SENSITIVITY = .5
    const AILERON_THRESHOLD = .1
    const diffAileron = targetAileron.value - aileron.value
    if (diffAileron > AILERON_THRESHOLD) aileron.value += AILERON_SENSITIVITY * dt || 0
    else if (diffAileron < -AILERON_THRESHOLD) aileron.value += -AILERON_SENSITIVITY * dt || 0
    else aileron.value += diffAileron * dt || 0
  }

  const updateRudder = () => {
    if (targetRudder.value === 0) {
      rudder.value /= 1.1
      return
    }

    const RUDDER_SENSITIVITY = .5
    const RUDDER_THRESHOLD = .1
    const diffRudder = targetRudder.value - rudder.value
    if (diffRudder > RUDDER_THRESHOLD) rudder.value += RUDDER_SENSITIVITY * dt || 0
    else if (diffRudder < -RUDDER_THRESHOLD) rudder.value += -RUDDER_SENSITIVITY * dt || 0
    else rudder.value += diffRudder * dt || 0
  }

  const updateThrottle = () => {
    if (!engagedAp.value) return

    const THROTTLE_SENSITIVITY = .5
    const THROTTLE_THRESHOLD = .005
    const diffThrottleLeft = targetThrottleLeft.value - throttleLeft.value
    if (diffThrottleLeft > THROTTLE_THRESHOLD) throttleLeft.value += THROTTLE_SENSITIVITY * dt || 0
    else if (diffThrottleLeft < -THROTTLE_THRESHOLD) throttleLeft.value += -THROTTLE_SENSITIVITY * dt || 0
    else throttleLeft.value += diffThrottleLeft * dt || 0
    const diffThrottleRight = targetThrottleRight.value - throttleRight.value
    if (diffThrottleRight > THROTTLE_THRESHOLD) throttleRight.value += THROTTLE_SENSITIVITY * dt || 0
    else if (diffThrottleRight < -THROTTLE_THRESHOLD) throttleRight.value += -THROTTLE_SENSITIVITY * dt || 0
    else throttleRight.value += diffThrottleRight * dt || 0
  }

  const updateControl = () => {
    updateElevator()
    updateAileron()
    updateRudder()
    updateThrottle()
  }

  const controlAircraft = () => {
    updateState()
    updatePositionAndVelocity()
    updateControl()
  }

  // autopilot
  const engagedAp = ref(false)
  const engagedHdg = ref(false)
  const engagedAlt = ref(false)
  const engagedVs = ref(false)
  const engagedIas = ref(false)
  const cmdHdg = ref(71)
  const cmdAlt = ref(4000)
  const cmdVs = ref(300)
  const cmdIas = ref(240)

  return {
    x,
    y,
    z,
    Vx,
    Vy,
    Vz,
    V,
    Vxy,
    gs,
    tas,
    ias,
    gForce,
    inHg,
    alt,
    vs,
    pitch,
    bank,
    heading,
    tracking,
    aoa,
    glide,
    elevator,
    aileron,
    rudder,
    stabTrim,
    targetElevator,
    targetAileron,
    targetRudder,
    N1Left,
    N1Right,
    N2Left,
    N2Right,
    throttleLeft,
    throttleRight,
    targetThrottleLeft,
    targetThrottleRight,
    targetN2Left,
    targetN2Right,
    MAX_POWER,
    MIN_POWER,
    engagedAp,
    engagedHdg,
    engagedAlt,
    engagedVs,
    engagedIas,
    cmdHdg,
    cmdAlt,
    cmdVs,
    cmdIas,
    controlAircraft
  }
}

export const provideUseStore = (fps: number): UseStore => {
  const useObj = useStore(fps)
  provide(USE_STORE, useObj)
  return useObj
}

export const injectUseStore = (): UseStore => {
  const useObj = inject(USE_STORE)
  if (useObj) return useObj
  throw new Error('error useStore')
}
