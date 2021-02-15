import Conditions from '../../../../../resources/conditions.js';
import NetRegexes from '../../../../../resources/netregexes.ts';
import { Responses } from '../../../../../resources/responses.js';
import ZoneId from '../../../../../resources/zone_id.js';

export default {
  zoneId: ZoneId.TheWeepingCityOfMhach,
  timelineFile: 'weeping_city.txt',
  timelineTriggers: [
    {
      id: 'Weeping City Dark Spike',
      regex: /Dark Spike/,
      beforeSeconds: 4,
      condition: Conditions.caresAboutPhysical(),
      response: Responses.tankBuster(),
    },
    {
      id: 'Weeping City Widow\'s Kiss',
      regex: /The Widow's Kiss/,
      beforeSeconds: 5,
      // Probably kills the player if failed, so it gets an alert.
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Stand on webs',
          de: 'Auf den Spinnennetzen stehen',
          ja: 'アンキレーウェブに入る',
          cn: '站在网上',
          ko: '거미줄 위에 서기',
        },
      },
    },
    {
      id: 'Weeping City Punishing Ray',
      regex: /Punishing Ray/,
      beforeSeconds: 10,
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Get Puddles',
          de: 'Flächen nehmen',
          fr: 'Allez dans les zones au sol',
          ja: '踏む',
          cn: '踩圈',
          ko: '바닥 징 밟기',
        },
      },
    },
    {
      id: 'Weeping City Bloodied Nail',
      regex: /Bloodied Nail/,
      beforeSeconds: 4,
      condition: Conditions.caresAboutPhysical(),
      suppressSeconds: 10,
      response: Responses.tankBuster(),
    },
    {
      id: 'Weeping City Split End',
      regex: /Split End/,
      beforeSeconds: 4,
      suppressSeconds: 10,
      response: Responses.tankCleave(),
    },
    {
      id: 'Weeping City Aura Burst',
      regex: /Aura Burst/,
      beforeSeconds: 4,
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
  ],
  triggers: [
    {
      // 2 of the 4 encounters in Weeping City use the 0017 head marker.
      // 2 of the 4 use the 003E head marker.
      // Because of this, we restrict those triggers for each boss to activate
      // only when that boss is in progress.
      id: 'Weeping City HeadMarker Arachne',
      netRegex: NetRegexes.message({ line: 'The Queen\'s Room will be sealed off.*?', capture: false }),
      netRegexDe: NetRegexes.message({ line: 'Spinnenfalle will be sealed off.*?', capture: false }),
      netRegexFr: NetRegexes.message({ line: 'Domaine de la Tisseuse will be sealed off.*?', capture: false }),
      netRegexJa: NetRegexes.message({ line: '蜘蛛女の狩場 will be sealed off.*?', capture: false }),
      netRegexCn: NetRegexes.message({ line: '女王蛛猎场 will be sealed off.*?', capture: false }),
      netRegexKo: NetRegexes.message({ line: '거미 여왕의 사냥터 will be sealed off.*?', capture: false }),
      run: function(data) {
        data.arachneStarted = true;
      },
    },
    {
      id: 'Weeping City HeadMarker Ozma',
      netRegex: NetRegexes.message({ line: 'The Gloriole will be sealed off.*?', capture: false }),
      netRegexDe: NetRegexes.message({ line: '金字塔上层 will be sealed off.*?', capture: false }),
      netRegexFr: NetRegexes.message({ line: 'Aureole will be sealed off.*?', capture: false }),
      netRegexJa: NetRegexes.message({ line: 'Hauteurs de la pyramide will be sealed off.*?', capture: false }),
      netRegexCn: NetRegexes.message({ line: 'ピラミッド上部層 will be sealed off.*?', capture: false }),
      netRegexKo: NetRegexes.message({ line: '피라미드 상층부 will be sealed off.*?', capture: false }),
      run: function(data) {
        data.arachneStarted = false;
        data.ozmaStarted = true;
      },
    },
    {
      id: 'Weeping City HeadMarker Calofisteri',
      netRegex: NetRegexes.message({ line: 'The Tomb Of The Nullstone will be sealed off.*?', capture: false }),
      netRegexDe: NetRegexes.message({ line: 'Kammer des Nullsteins will be sealed off.*?', capture: false }),
      netRegexFr: NetRegexes.message({ line: 'Tombeau de la Clef de voûte will be sealed off.*?', capture: false }),
      netRegexJa: NetRegexes.message({ line: '要の玄室 will be sealed off.*?', capture: false }),
      netRegexCn: NetRegexes.message({ line: '契约石玄室 will be sealed off.*?', capture: false }),
      netRegexKo: NetRegexes.message({ line: '쐐기 안치소 will be sealed off.*?', capture: false }),
      run: function(data) {
        data.ozmaStarted = false;
        data.calStarted = true;
      },
    },
    {
      id: 'Weeping City Sticky Wicket',
      netRegex: NetRegexes.headMarker({ id: '003C', capture: false }),
      suppressSeconds: 10,
      response: Responses.spread(),
    },
    {
      id: 'Weeping City Shadow Burst',
      netRegex: NetRegexes.headMarker({ id: '003E' }),
      condition: function(data) {
        return data.arachneStarted;
      },
      response: Responses.stackMarkerOn(),
    },
    {
      id: 'Weeping City Frond Affeared',
      netRegex: NetRegexes.startsUsing({ id: '183A', source: 'Arachne Eve', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '183A', source: 'Arachne (?:der|die|das) Ahnin', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '183A', source: 'Arachné Mère', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '183A', source: 'アルケニー', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '183A', source: '아라크네', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '183A', source: '阿剌克涅', capture: false }),
      response: Responses.lookAway(),
    },
    {
      id: 'Weeping City Arachne Web',
      netRegex: NetRegexes.headMarker({ id: '0017' }),
      condition: function(data, matches) {
        return data.arachneStarted && data.me === matches.target;
      },
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Drop Web Outside',
          de: 'Spinnennetz draußen ablegen',
          ja: 'ウェブを外周に捨てる',
          cn: '蛛网点名，放在场边',
          ko: '거미줄 바깥쪽으로 빼기',
        },
      },
    },
    {
      id: 'Weeping City Brand Of The Fallen',
      netRegex: NetRegexes.headMarker({ id: '0037' }),
      condition: Conditions.targetIsYou(),
      response: Responses.doritoStack(),
    },
    {
      id: 'Weeping City Dark Eruption',
      netRegex: NetRegexes.headMarker({ id: '0019' }),
      condition: Conditions.targetIsYou(),
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Puddles on YOU',
          de: 'Pfützen auf DIR',
          fr: 'Mare sur VOUS',
          ja: '自分に床範囲',
          cn: '圈圈点名',
          ko: '장판 바깥에 깔기',
        },
      },
    },
    {
      id: 'Weeping City Beguiling Mist',
      netRegex: NetRegexes.startsUsing({ id: '17CE', source: 'Summoned Succubus' }),
      netRegexDe: NetRegexes.startsUsing({ id: '17CE', source: 'Beschworen(?:e|er|es|en) Sukkubus' }),
      netRegexFr: NetRegexes.startsUsing({ id: '17CE', source: 'Succube Adjuré' }),
      netRegexJa: NetRegexes.startsUsing({ id: '17CE', source: 'サモン・サキュバス' }),
      netRegexKo: NetRegexes.startsUsing({ id: '17CE', source: '소환된 서큐버스' }),
      netRegexCn: NetRegexes.startsUsing({ id: '17CE', source: '被召唤出的梦魔' }),
      condition: function(data) {
        return data.CanSilence();
      },
      response: Responses.interrupt(),
    },
    {
      id: 'Weeping City Mortal Ray',
      netRegex: NetRegexes.startsUsing({ id: '17D4', source: 'Summoned Haagenti' }),
      netRegexDe: NetRegexes.startsUsing({ id: '17D4', source: 'Beschworen(?:e|er|es|en) Haagenti' }),
      netRegexFr: NetRegexes.startsUsing({ id: '17D4', source: 'Haagenti Adjuré' }),
      netRegexJa: NetRegexes.startsUsing({ id: '17D4', source: 'サモン・ハーゲンティ' }),
      netRegexKo: NetRegexes.startsUsing({ id: '17D4', source: '소환된 하겐티' }),
      netRegexCn: NetRegexes.startsUsing({ id: '17D4', source: '被召唤出的哈加提' }),
      response: Responses.lookAwayFromSource(),
    },
    {
      id: 'Weeping City Hell Wind',
      netRegex: NetRegexes.startsUsing({ id: '17CB', source: 'Forgall', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '17CB', source: 'Forgall', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '17CB', source: 'Forgall', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '17CB', source: 'フォルガル', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '17CB', source: '포르갈', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '17CB', source: '弗加尔', capture: false }),
      // Hell Wind sets HP to single digits, so mitigations don't work. Don't notify non-healers.
      condition: function(data) {
        return data.role === 'healer';
      },
      response: Responses.aoe(),
    },
    {
      id: 'Weeping City Mega Death',
      netRegex: NetRegexes.startsUsing({ id: '17CA', source: 'Forgall', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '17CA', source: 'Forgall', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '17CA', source: 'Forgall', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '17CA', source: 'フォルガル', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '17CA', source: '포르갈', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '17CA', source: '弗加尔', capture: false }),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Stand in one puddle',
          de: 'In einer Fläche stehen',
          ja: '範囲に入る',
          cn: '站在圈里',
          ko: '장판으로',
        },
      },
    },
    {
      id: 'Weeping City Meteor Impact',
      netRegex: NetRegexes.headMarker({ id: '0039' }),
      condition: Conditions.targetIsYou(),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Drop meteor back or left',
          de: 'Meteor hinten oder links ablegen',
          ja: 'メテオ、後ろや左に置く',
          cn: '流星点名，放在背后或左边',
          ko: '메테오 뒤/왼쪽으로 빼기',
        },
      },
    },
    {
      // The ability used here is Ozma entering Pyramid form.
      // Execration follows this up almost immediately.
      id: 'Weeping City Execration',
      netRegex: NetRegexes.ability({ id: '1826', source: 'Ozma', capture: false }),
      netRegexDe: NetRegexes.ability({ id: '1826', source: 'Yadis', capture: false }),
      netRegexFr: NetRegexes.ability({ id: '1826', source: 'Ozma', capture: false }),
      netRegexJa: NetRegexes.ability({ id: '1826', source: 'オズマ', capture: false }),
      netRegexKo: NetRegexes.ability({ id: '1826', source: '오즈마', capture: false }),
      netRegexCn: NetRegexes.ability({ id: '1826', source: '奥兹玛', capture: false }),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Get off rectangle platform',
          de: 'Von der plattform runter gehen',
          ja: '通路で回避',
          cn: '离开平台',
          ko: '통로로 이동',
        },
      },
    },
    {
      // The ability used here is Ozma entering Cube form.
      // Flare Star and tank lasers follow shortly.
      id: 'Weeping City Flare Star Ring',
      netRegex: NetRegexes.ability({ id: '1803', source: 'Ozma', capture: false }),
      netRegexDe: NetRegexes.ability({ id: '1803', source: 'Yadis', capture: false }),
      netRegexFr: NetRegexes.ability({ id: '1803', source: 'Ozma', capture: false }),
      netRegexJa: NetRegexes.ability({ id: '1803', source: 'オズマ', capture: false }),
      netRegexKo: NetRegexes.ability({ id: '1803', source: '오즈마', capture: false }),
      netRegexCn: NetRegexes.ability({ id: '1803', source: '奥兹玛', capture: false }),
      response: Responses.getIn(),
    },
    {
      // The ability used here is Ozma entering Cube form. The actual laser ability, 1831,
      // is literally named "attack". Ozma zaps the 3 highest-threat targets. (Not always tanks!)
      // This continues until the next Sphere form, whether by time or by HP push.
      id: 'Weeping City Tank Lasers',
      netRegex: NetRegexes.ability({ id: '1803', source: 'Ozma', capture: false }),
      netRegexDe: NetRegexes.ability({ id: '1803', source: 'Yadis', capture: false }),
      netRegexFr: NetRegexes.ability({ id: '1803', source: 'Ozma', capture: false }),
      netRegexJa: NetRegexes.ability({ id: '1803', source: 'オズマ', capture: false }),
      netRegexKo: NetRegexes.ability({ id: '1803', source: '오즈마', capture: false }),
      netRegexCn: NetRegexes.ability({ id: '1803', source: '奥兹玛', capture: false }),
      // Delaying here to avoid colliding with other Flare Star triggers.
      delaySeconds: 4,
      alertText: function(data, _, output) {
        if (data.role === 'tank')
          return output.tankLasers();

        return output.avoidTanks();
      },
      outputStrings: {
        tankLasers: {
          en: 'Tank lasers--Avoid party',
          de: 'Tank lasers--Weg von der Party',
          ja: 'タンクレーザー - 外に',
          cn: '坦克激光--远离人群',
          ko: '탱커 레이저-- 피하기',
        },
        avoidTanks: {
          en: 'Avoid tanks',
          de: 'Weg von den Tanks',
          ja: 'タンクから離れる',
          cn: '远离坦克',
          ko: '탱커 피하기',
        },
      },
    },
    {
      // The NPC name is Ozmasphere. These need to be popped just like any other Flare Star.
      // Failing to pop an orb means it will explode, dealing damage with 1808 Aethernova.
      id: 'Weeping City Flare Star Orbs',
      netRegex: NetRegexes.addedCombatantFull({ npcBaseId: '4889', capture: false }),
      condition: function(data) {
        return data.role === 'tank' || data.role === 'healer';
      },
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Get orbs',
          de: 'Kugeln nehmen',
          ja: '玉を取る',
          cn: '撞球',
          ko: '구슬 먹기',
        },
      },
    },
    {
      id: 'Weeping City Acceleration Bomb',
      netRegex: NetRegexes.gainsEffect({ effectId: '430' }),
      condition: Conditions.targetIsYou(),
      delaySeconds: function(data, matches) {
        return parseFloat(matches.duration) - 3;
      },
      response: Responses.stopEverything(),
    },
    {
      id: 'Weeping City Assimilation',
      netRegex: NetRegexes.startsUsing({ id: '1802', source: 'Ozmashade', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '1802', source: 'Yadis-Schatten', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '1802', source: 'Ombre D\'Ozma', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '1802', source: 'オズマの影', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '1802', source: '오즈마의 그림자', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '1802', source: '奥兹玛之影', capture: false }),
      response: Responses.lookAway(),
    },
    {
      // Each party gets a stack marker, so this is the best we can do.
      id: 'Weeping City Meteor Stack',
      netRegex: NetRegexes.headMarker({ id: '003E', capture: false }),
      condition: function(data) {
        return data.ozmaStarted;
      },
      suppressSeconds: 5,
      response: Responses.stackMarker(),
    },
    {
      // Coif Change is always followed up shortly by Haircut.
      // There's no castbar or indicator except that she grows a scythe on one side.
      // It's not a very obvious visual cue unless the player knows to look for it.
      id: 'Weeping City Coif Change Left',
      netRegex: NetRegexes.ability({ id: '180A', source: 'Calofisteri', capture: false }),
      netRegexDe: NetRegexes.ability({ id: '180A', source: 'Calofisteri', capture: false }),
      netRegexFr: NetRegexes.ability({ id: '180A', source: 'Calofisteri', capture: false }),
      netRegexJa: NetRegexes.ability({ id: '180A', source: 'カロフィステリ', capture: false }),
      netRegexKo: NetRegexes.ability({ id: '180A', source: '칼로피스테리', capture: false }),
      netRegexCn: NetRegexes.ability({ id: '180A', source: '卡洛菲斯提莉', capture: false }),
      response: Responses.goRight(),
    },
    {
      id: 'Weeping City Coif Change Right',
      netRegex: NetRegexes.ability({ id: '180E', source: 'Calofisteri', capture: false }),
      netRegexDe: NetRegexes.ability({ id: '180E', source: 'Calofisteri', capture: false }),
      netRegexFr: NetRegexes.ability({ id: '180E', source: 'Calofisteri', capture: false }),
      netRegexJa: NetRegexes.ability({ id: '180E', source: 'カロフィステリ', capture: false }),
      netRegexKo: NetRegexes.ability({ id: '180E', source: '칼로피스테리', capture: false }),
      netRegexCn: NetRegexes.ability({ id: '180E', source: '卡洛菲斯提莉', capture: false }),
      response: Responses.goLeft(),
    },
    {
      // 4899 is the base ID for bulb hair. 4900 is axe hair.
      // Bulbs do a circle AoE surrounding them, while axes are a donut.
      id: 'Weeping City Living Lock Axes',
      netRegex: NetRegexes.addedCombatantFull({ npcNameId: ['4899', '4900'], capture: false }),
      suppressSeconds: 5,
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Close to axes, avoid bulbs',
          de: 'Nahe den Äxten, vermeide Knospen',
          ja: '刃物の髪に近づき、丸い髪から離れる',
          cn: '靠近斧状发，远离球状发',
          ko: '도끼모양에 붙고, 둥근모양은 피하기',
        },
      },
    },
    {
      id: 'Weeping City Living Lock Scythes',
      netRegex: NetRegexes.addedCombatantFull({ npcNameId: '4898', capture: false }),
      suppressSeconds: 5,
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Avoid scythe line AoEs',
          de: 'Weiche den Sensen AOEs aus',
          ja: '十字AoE',
          cn: '躲避镰刀直线AOE',
          ko: '직선 장판 피하기',
        },
      },
    },
    {
      // These adds are the purple circles waiting to grab people and Garrotte them.
      id: 'Weeping City Entanglement',
      netRegex: NetRegexes.addedCombatantFull({ npcNameId: '4904', capture: false }),
      suppressSeconds: 5,
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Avoid purple circles',
          de: 'Vermeide die lilanen Flächen',
          ja: '紫の円範囲を避ける',
          cn: '远离紫圈',
          ko: '보라색 원 피하기',
        },
      },
    },
    {
      // If by some chance someone actually did stand in the purple circles, break them out.
      // The actual ability here is an Unknown ability, but it begins slightly before Garrotte.
      id: 'Weeping City Garrotte',
      netRegex: NetRegexes.ability({ id: '181D', source: 'Entanglement', capture: false }),
      netRegexDe: NetRegexes.ability({ id: '181D', source: 'Verfilzung', capture: false }),
      netRegexFr: NetRegexes.ability({ id: '181D', source: 'Emmêlement', capture: false }),
      netRegexJa: NetRegexes.ability({ id: '181D', source: '魔髪の縛め', capture: false }),
      netRegexKo: NetRegexes.ability({ id: '181D', source: '머리카락 포박', capture: false }),
      netRegexCn: NetRegexes.ability({ id: '181D', source: '魔发束缚', capture: false }),
      suppressSeconds: 5,
      response: Responses.killExtraAdd(),
    },
    {
      id: 'Weeping City Particle Beam',
      netRegex: NetRegexes.headMarker({ id: '0017' }),
      condition: function(data) {
        return data.calStarted;
      },
      alertText: function(data, matches, output) {
        if (data.me === matches.target)
          return output.skyLaserOnYou();

        return output.avoidSkyLasers();
      },
      outputStrings: {
        skyLaserOnYou: {
          en: '16x Sky Laser on YOU!',
          de: '16x Himmelslaser auf DIR!',
          ja: '自分に16連撃潜地式波動砲！',
          cn: '16连追踪AOE点名',
          ko: '16 하늘 레이저 대상자',
        },
        avoidSkyLasers: {
          en: 'Avoid Sky Lasers',
          de: 'Himmelslaser ausweichen',
          ja: '潜地式波動砲を避ける',
          cn: '躲避追踪AOE',
          ko: '하늘 레이저 피하기',
        },
      },
    },
    {
      // The actual ability here is Mana Drain, which ends the intermission.
      // Dancing Mad follows this up closely enough to make this the best time to notify.
      id: 'Weeping City Dancing Mad',
      netRegex: NetRegexes.ability({ id: '1819', source: 'Calofisteri', capture: false }),
      netRegexDe: NetRegexes.ability({ id: '1819', source: 'Calofisteri', capture: false }),
      netRegexFr: NetRegexes.ability({ id: '1819', source: 'Calofisteri', capture: false }),
      netRegexJa: NetRegexes.ability({ id: '1819', source: 'カロフィステリ', capture: false }),
      netRegexKo: NetRegexes.ability({ id: '1819', source: '칼로피스테리', capture: false }),
      netRegexCn: NetRegexes.ability({ id: '1819', source: '卡洛菲斯提莉', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'Weeping City Penetration',
      netRegex: NetRegexes.startsUsing({ id: '1822', source: 'Calofisteri', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '1822', source: 'Calofisteri', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '1822', source: 'Calofisteri', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '1822', source: 'カロフィステリ', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '1822', source: '칼로피스테리', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '1822', source: '卡洛菲斯提莉', capture: false }),
      response: Responses.lookAway(),
    },
    {
      id: 'Weeping City Depth Charge',
      netRegex: NetRegexes.startsUsing({ id: '1820', source: 'Calofisteri', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '1820', source: 'Calofisteri', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '1820', source: 'Calofisteri', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '1820', source: 'カロフィステリ', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '1820', source: '칼로피스테리', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '1820', source: '卡洛菲斯提莉', capture: false }),
      response: Responses.awayFromFront(),
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Arachne Eve': 'Arachne (?:der|die|das) Ahnin',
        'Calofisteri': 'Calofisteri',
        'Forgall': 'Forgall',
        'Living Lock': 'lebend(?:e|er|es|en) Locke',
        'Ozma': 'Yadis',
        'Poison Mist': 'Giftnebel',
        'Shriveled Talon': 'verschrumpelt(?:e|er|es|en) Harpyie',
        'Singularity Fragment': 'Singularitätsfragment',
        'The Gloriole': 'Aureole',
        'The Queen\'s Room': 'Spinnenfalle',
        'The Shrine Of The Goetic': 'Altar der Goëtie',
        'The Tomb Of The Nullstone': 'Kammer des Nullsteins',
      },
      'replaceText': {
        'Acceleration Bomb': 'Beschleunigungsbombe',
        'Arachne Web': 'Arachne-Netz',
        'Aura Burst': 'Auraknall',
        'Black Hole': 'Schwarzes Loch',
        'Bloodied Nail': 'Blutiger Nagel',
        'Brand of the Fallen': 'Brandzeichen der Opferung',
        'Coif Change': 'Typveränderung',
        'Cube': 'Kubus',
        'Dancing Mad': 'Wilder Tanz',
        'Dark Eruption': 'Dunkle Eruption',
        'Dark Spike': 'Dunkler Stachel',
        'Depth Charge': 'Tiefenangriff',
        'Evil Curl': 'Böse Locke',
        'Evil Mist': 'Bösartiger Nebel',
        'Evil Switch': 'Böse Strähne',
        'Evil Tress': 'Böse Mähne',
        'Execration': 'Exsekration',
        '(?<! )Explosion': 'Explosion',
        'Extension': 'Strähnchen',
        'Feint Particle Beam': 'Schein-Partikelstrahl',
        'Flare Star': 'Flare-Stern',
        'Frond Affeared': 'Antlitz der Angst',
        'Haircut': 'Haarschnitt',
        'Hell Wind': 'Höllenwind',
        'Holy': 'Sanctus',
        'Implosion': 'Implosion',
        'Mana Drain': 'Magische Anziehung',
        'Mana Explosion': 'Mana-Explosion',
        'Mega Death': 'Megatod',
        'Megiddo Flame': 'Megiddoflamme',
        'Meteor(?![\\w\\s])': 'Meteo',
        'Meteor Headmarkers': 'Meteor Markierungen',
        'Meteor Impact': 'Meteoreinschlag',
        'Necropurge': 'Nekrobuße',
        'Penetration': 'Durchdringen',
        'Pitfall': 'Berstender Boden',
        'Punishing Ray': 'Strafender Strahl',
        'Pyramid': 'Pyramide',
        'Shadow Burst': 'Schattenstoß',
        'Silken Spray': 'Seidengespinst',
        'Split End': 'Gespaltene Spitzen',
        'Sticky Wicket': 'Klebfadenfetzen',
        'Tank Lasers': 'Tank Laser',
        'The Widow\'s Embrace': 'Eiserne Umgarnung',
        'The Widow\'s Kiss': 'Seidige Umgarnung',
        'Transfiguration': 'Transfiguration',
        'Tremblor': 'Erdbeben',
      },
    },
    {
      'locale': 'fr',
      'missingTranslations': true,
      'replaceSync': {
        'Arachne Eve': 'Arachné mère',
        'Calofisteri': 'Calofisteri',
        'Forgall': 'Forgall',
        'Living Lock': 'mèche animée',
        'Ozma': 'Ozma',
        'Poison Mist': 'Brume empoisonnée',
        'Shriveled Talon': 'dépouille de Harpie féroce',
        'Singularity Fragment': 'fragment de singularité',
        'The Gloriole': 'Hauteurs de la pyramide',
        'The Queen\'s Room': 'Domaine de la Tisseuse',
        'The Shrine Of The Goetic': 'Sanctuaire du Goétique',
        'The Tomb Of The Nullstone': 'Tombeau de la Clef de voûte',
      },
      'replaceText': {
        'Acceleration Bomb': 'Bombe accélératrice',
        'Arachne Web': 'Toile d\'Arachné',
        'Aura Burst': 'Déflagration d\'aura',
        'Black Hole': 'Trou noir',
        'Bloodied Nail': 'Ongles sanglants',
        'Brand of the Fallen': 'Marque des déchus',
        'Coif Change': 'Recoiffage',
        'Cube': 'Cube',
        'Dancing Mad': 'Danse effrénée',
        'Dark Eruption': 'Éruption ténébreuse',
        'Dark Spike': 'Pointe ténébreuse',
        'Depth Charge': 'Charge des profondeurs',
        'Evil Curl': 'Boucle maléfique',
        'Evil Mist': 'Brume maléfique',
        'Evil Switch': 'Fouetté maléfique',
        'Evil Tress': 'Tresse maléfique',
        'Execration': 'Exécration',
        '(?<! )Explosion': 'Explosion',
        'Extension': 'Extension',
        'Feint Particle Beam': 'Rayon pénétrant',
        'Flare Star': 'Astre flamboyant',
        'Frond Affeared': 'Fronde effrayante',
        'Haircut': 'Coupe de cheveux',
        'Hell Wind': 'Vent infernal',
        'Holy': 'Miracle',
        'Implosion': 'Implosion',
        'Mana Drain': 'Inspiration de magie',
        'Mana Explosion': 'Explosion de mana',
        'Mega Death': 'Mégamort',
        'Megiddo Flame': 'Flamme de Megiddo',
        'Meteor(?![\\w\\s])': 'Météore',
        'Meteor Impact': 'Impact de météore',
        'Necropurge': 'Nécropurge',
        'Penetration': 'Pénétration',
        'Pitfall': 'Embûche',
        'Punishing Ray': 'Rayon punitif',
        'Pyramid': 'Pyramide',
        'Shadow Burst': 'Salve ténébreuse',
        'Silken Spray': 'Aspersion de soie',
        'Split End': 'Pointes fourchues',
        'Sticky Wicket': 'Projectile collant',
        'The Widow\'s Embrace': 'Gravité arachnéenne',
        'The Widow\'s Kiss': 'Attraction arachnéenne',
        'Transfiguration': 'Transmutation',
        'Tremblor': 'Tremblement de terre',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Arachne Eve': 'アルケニー',
        'Calofisteri': 'カロフィステリ',
        'Forgall': 'フォルガル',
        'Living Lock': 'カロフィステリの魔髪',
        'Ozma': 'オズマ',
        'Poison Mist': '毒霧',
        'Shriveled Talon': '大鷲連合の遺骸',
        'Singularity Fragment': '圧縮世界の断片',
        'The Gloriole': 'ピラミッド上部層',
        'The Queen\'s Room': '蜘蛛女の狩場',
        'The Shrine Of The Goetic': '神託の祭壇',
        'The Tomb Of The Nullstone': '要の玄室',
      },
      'replaceText': {
        'Acceleration Bomb': '加速度爆弾',
        'Arachne Web': 'アンキレーウェブ',
        'Aura Burst': 'オーラバースト',
        'Black Hole': 'ブラックホール',
        'Bloodied Nail': 'ブラッディネイル',
        'Brand of the Fallen': '生贄の烙印',
        'Coif Change': '魔髪変化',
        'Cube': '立方体状態',
        'Dancing Mad': 'ダンシングマッド',
        'Dark Eruption': 'ダークエラプション',
        'Dark Spike': 'ダークスパイク',
        'Depth Charge': 'デプスチャージ',
        'Evil Curl': 'イビルカール',
        'Evil Mist': 'イビルミスト',
        'Evil Switch': 'イビルスウィッチ',
        'Evil Tress': 'イビルトレス',
        'Execration': 'エクセクレイション',
        '(?<! )Explosion': '爆発',
        'Extension': 'エクステンション',
        'Feint Particle Beam': '潜地式波動砲',
        'Flare Star': 'フレアスター',
        'Frond Affeared': '恐怖のまなざし',
        'Haircut': 'ヘアカット',
        'Hell Wind': 'ヘルウィンド',
        'Holy': 'ホーリー',
        'Implosion': 'インプロージョン',
        'Mana Drain': '魔力吸引',
        'Mana Explosion': '魔力爆発',
        'Mega Death': 'オーバーデス',
        'Megiddo Flame': 'メギドフレイム',
        'Meteor(?![\\w\\s])': 'メテオ',
        'Meteor Headmarkers': 'メテオ マーキング',
        'Meteor Impact': 'メテオインパクト',
        'Necropurge': 'ネクロパージ',
        'Penetration': 'ペネトレーション',
        'Pitfall': '強襲',
        'Punishing Ray': 'パニッシュレイ',
        'Pyramid': '三角錐状態',
        'Shadow Burst': 'シャドウバースト',
        'Silken Spray': 'シルクスプレー',
        'Sphere': '球体状態',
        'Split End': 'スプリットエンド',
        'Sticky Wicket': 'スティッキーウィケット',
        'Tank Lasers': 'タンクレザー',
        'The Widow\'s Embrace': '蜘蛛の大罠',
        'The Widow\'s Kiss': '蜘蛛の罠',
        'Transfiguration': '形態変化',
        'Tremblor': '地震',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Arachne Eve': '阿剌克涅',
        'Calofisteri': '卡洛菲斯提莉',
        'Forgall': '弗加尔',
        'Living Lock': '卡洛菲斯提莉的魔发',
        'Ozma': '奥兹玛',
        'Poison Mist': '毒雾',
        'Shriveled Talon': '猛禽联盟遗骸',
        'Singularity Fragment': '压缩世界的断片',
        'The Gloriole': '金字塔上层',
        'The Queen\'s Room': '女王蛛猎场',
        'The Shrine Of The Goetic': '神谕祭坛',
        'The Tomb Of The Nullstone': '契约石玄室',
      },
      'replaceText': {
        'Acceleration Bomb': '加速度炸弹',
        'Arachne Web': '阿剌克涅之网',
        'Aura Burst': '灵气爆',
        'Black Hole': '黑洞',
        'Bloodied Nail': '血爪',
        'Brand of the Fallen': '祭品烙印',
        'Coif Change': '魔发变化',
        'Cube': '立方体形态',
        'Dancing Mad': '魔发狂舞',
        'Dark Eruption': '暗炎喷发',
        'Dark Spike': '暗之刺爪',
        'Depth Charge': '蓄力冲击',
        'Evil Curl': '罪恶发旋',
        'Evil Mist': '恶魔毒雾',
        'Evil Switch': '罪恶发钩',
        'Evil Tress': '罪恶发团',
        'Execration': '缩小射线',
        '(?<! )Explosion': '爆炸',
        'Extension': '接发',
        'Feint Particle Beam': '潜地式波动炮',
        'Flare Star': '耀星',
        'Frond Affeared': '恐惧视线',
        'Haircut': '魔发斩',
        'Hell Wind': '地狱之风',
        'Holy': '神圣',
        'Implosion': '向心聚爆',
        'Mana Drain': '魔力吸收',
        'Mana Explosion': '魔力爆炸',
        'Mega Death': '超即死',
        'Megiddo Flame': '米吉多烈焰',
        'Meteor(?![\\w\\s])': '陨石',
        'Meteor Headmarkers': '陨石点名',
        'Meteor Impact': '陨石冲击',
        'Necropurge': '死灵潜质',
        'Penetration': '透耳尖啸',
        'Pitfall': '强袭',
        'Punishing Ray': '惩戒之光',
        'Pyramid': '三角锥形态',
        'Shadow Burst': '暗影爆',
        'Silken Spray': '喷吐蛛丝',
        'Sphere': '球形态',
        'Split End': '发梢分裂',
        'Sticky Wicket': '粘液弹',
        'Tank Lasers': '坦克激光',
        'The Widow\'s Embrace': '大蜘蛛陷阱',
        'The Widow\'s Kiss': '蜘蛛陷阱',
        'Transfiguration': '形态变化',
        'Tremblor': '地震',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Arachne Eve': '아라크네',
        'Calofisteri': '칼로피스테리',
        'Forgall': '포르갈',
        'Living Lock': '칼로피스테리의 머리카락',
        'Ozma': '오즈마',
        'Poison Mist': '독안개',
        'Shriveled Talon': '참수리연합 주검',
        'Singularity Fragment': '압축세계의 단편',
        'The Gloriole': '피라미드 상층부',
        'The Queen\'s Room': '거미 여왕의 사냥터',
        'The Shrine Of The Goetic': '신탁의 제단',
        'The Tomb Of The Nullstone': '쐐기 안치소',
      },
      'replaceText': {
        'Acceleration Bomb': '가속도 폭탄',
        'Arachne Web': '아라크네의 거미줄',
        'Aura Burst': '오라 폭발',
        'Black Hole': '블랙홀',
        'Bloodied Nail': '핏빛 손톱',
        'Brand of the Fallen': '산제물 낙인',
        'Coif Change': '머리카락 변화',
        'Cube': '입방체',
        'Dancing Mad': '춤추는 광기',
        'Dark Eruption': '황천의 불기둥',
        'Dark Spike': '어둠의 내리치기',
        'Depth Charge': '심연 돌격',
        'Evil Curl': '악마의 곱슬머리',
        'Evil Mist': '악마의 안개',
        'Evil Switch': '악마의 머리채',
        'Evil Tress': '악마의 땋은머리',
        'Execration': '혐오의 저주',
        '(?<! )Explosion': '폭발',
        'Extension': '머리카락 연장',
        'Feint Particle Beam': '위장형 파동포',
        'Flare Star': '타오르는 별',
        'Frond Affeared': '섬뜩한 시선',
        'Haircut': '머리카락 참격',
        'Hell Wind': '황천의 바람',
        'Holy': '홀리',
        'Implosion': '내파',
        'Mana Drain': '마력 흡입',
        'Mana Explosion': '마력 폭발',
        'Mega Death': '범람하는 죽음',
        'Megiddo Flame': '메기도 플레임',
        'Meteor(?![\\w\\s])': '메테오',
        'Meteor Headmarkers': '메테오 머리징',
        'Meteor Impact': '운석 낙하',
        'Necropurge': '사령 침잠',
        'Penetration': '침투',
        'Pitfall': '강습',
        'Punishing Ray': '응징의 빛줄기',
        'Pyramid': '삼각뿔',
        'Shadow Burst': '그림자 폭발',
        'Silken Spray': '거미줄 분사',
        'Sphere': '구',
        'Split End': '쪼개기',
        'Sticky Wicket': '끈끈이 구멍',
        'Tank Lasers': '탱 레이저',
        'The Widow\'s Embrace': '큰거미의 포옹',
        'The Widow\'s Kiss': '거미 덫',
        'Transfiguration': '형태 변화',
        'Tremblor': '지진',
      },
    },
  ],
};
