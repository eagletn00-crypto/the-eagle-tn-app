import { Shield, Globe, Code2, Film, Fingerprint, Gavel, Mail } from 'lucide-react'
import LegalLayout from './LegalLayout'
import { Section, HighlightBox, InfoGrid, InfoField, BulletList, CertificateSeal } from './LegalComponents'

export default function MentionsLegales() {
  return (
    <LegalLayout
      title="Mentions Légales"
      subtitle="Informations légales obligatoires — Plateforme The Eagle TN · eagle-groupe.tn"
      lastUpdated="16 mai 2026"
      version="v2.0"
    >
      <CertificateSeal />

      <Section icon={<Globe size={16} />} title="1. Éditeur de la Plateforme">
        <p>
          La plateforme numérique <strong>The Eagle TN</strong> est éditée et exploitée exclusivement par <strong>Eagle Groupe</strong>, société de droit tunisien.
        </p>
        <InfoGrid>
          <InfoField label="Domaine officiel" value="eagle-groupe.tn" highlight />
          <InfoField label="Siège social" value="Tunis, République Tunisienne" />
          <InfoField label="Email juridique" value="legal@eagle-groupe.tn" />
          <InfoField label="Email support" value="support@eagle-groupe.tn" />
          <InfoField label="Téléphone" value="+216 71 000 000" />
          <InfoField label="Statut" value="Plateforme Vérifiée INPDP" highlight />
        </InfoGrid>
      </Section>

      <Section icon={<Shield size={16} />} title="2. Directeur de la Publication">
        <p>
          Le directeur de la publication est le représentant légal d'Eagle Groupe, habilité à engager la société sur le plan juridique et à répondre de tout contenu publié sur la plateforme <strong>eagle-groupe.tn</strong>.
        </p>
      </Section>

      <Section icon={<Code2 size={16} />} title="3. Hébergement & Infrastructure Technique">
        <p>
          La plateforme The Eagle TN repose sur une infrastructure cloud distribuée de niveau entreprise, assurant disponibilité 99,9 %, sécurité renforcée et conformité aux standards de protection des données applicables en Tunisie.
        </p>
        <InfoGrid>
          <InfoField label="Base de données" value="Supabase (PostgreSQL chiffré)" />
          <InfoField label="Frontend" value="React 19 + Vite 6 (build optimisé)" />
          <InfoField label="Animations" value="Framer Motion — Rendu 4K propriétaire" />
          <InfoField label="Protocole" value="HTTPS / TLS 1.3 — Chiffrement bout en bout" />
        </InfoGrid>
      </Section>

      <Section icon={<Fingerprint size={16} />} title="4. Propriété Intellectuelle — Certificat de Droits d'Auteur Déposés">
        <HighlightBox variant="gold">
          <strong>CERTIFICAT DE DROITS D'AUTEUR DÉPOSÉS — Eagle Groupe · eagle-groupe.tn</strong>
          <br /><br />
          L'ensemble des éléments constitutifs de la plateforme <strong>The Eagle TN</strong> bénéficient d'une protection intégrale au titre des droits d'auteur. Ce certificat couvre expressément et de manière non limitative :
        </HighlightBox>

        <BulletList items={[
          "L'intégralité du code source React 19 et de la configuration Vite 6, incluant les composants, hooks, stores Zustand, utilitaires TypeScript et fichiers de configuration",
          "Le système d'animations cinématiques 4K unique — animations de vol, d'atterrissage et de survol de l'aigle en 3D, effets de particules dorées, transitions de phases, animations de micro-interactions",
          "Le système de design propriétaire : thème carbone-noir et or 24 carats, palette de couleurs déposée (noir --ink-0 à --ink-7, gamme or --gold-50 à --gold-900), système de typographie (Playfair Display / Cormorant Garamond / Inter), tokens de design (radius, spacing 8px, ombres)",
          "L'identité visuelle complète : logo de l'aigle, animations SVG de l'aigle, badge doré, iconographie propriétaire, charte graphique",
          "L'écran d'accueil cinématique 4K (SplashScreen) : séquence d'animation, effets de particules orbitales, champ d'étoiles, interactions hover/tactile avec tilt 3D",
          "L'architecture applicative, la structure des routes, les schémas de base de données, les politiques Row Level Security Supabase",
          "Tous les textes, contenus rédactionnels, copies marketing et micro-textes UI en français",
        ]} />

        <HighlightBox variant="warning">
          <strong>Toute reproduction, représentation, extraction, modification, décompilation par rétro-ingénierie ou exploitation commerciale, même partielle</strong>, de l'un quelconque de ces éléments est <strong>strictement interdite sans autorisation écrite préalable d'Eagle Groupe</strong> et constitue une contrefaçon passible de sanctions civiles et pénales.
        </HighlightBox>
      </Section>

      <Section icon={<Film size={16} />} title="5. Protection Spécifique du Système d'Animations 4K">
        <p>
          Le système d'animations 4K de The Eagle TN constitue une <strong>œuvre audiovisuelle et logicielle originale</strong> protégée cumulativement par :
        </p>
        <BulletList items={[
          "Le droit d'auteur sur le code source des animations (Framer Motion, variants, keyframes, spring physics propriétaires)",
          "Le droit sui generis sur la base de données des paramètres d'animation (timing, easing curves, transform sequences)",
          "La protection des œuvres audiovisuelles pour les séquences d'animation rendues",
          "La protection du savoir-faire technique (know-how) pour l'architecture de l'animation system",
        ]} />
        <p>
          Toute tentative d'imitation, de reproduction du rendu visuel ou d'extraction des paramètres d'animation par quelque moyen technique que ce soit (inspection des sources, outils de développement navigateur, capture écran à des fins d'exploitation commerciale) est expressément interdite.
        </p>
      </Section>

      <Section icon={<Gavel size={16} />} title="6. Marques Déposées">
        <p>
          Les dénominations <strong>"The Eagle TN"</strong>, <strong>"Eagle Groupe"</strong>, le logotype de l'aigle doré et tout signe distinctif associé sont des marques déposées ou en cours de dépôt auprès des autorités tunisiennes compétentes. Toute utilisation non autorisée constitue une atteinte aux droits de marque.
        </p>
      </Section>

      <Section icon={<Shield size={16} />} title="7. Données Personnelles & Conformité INPDP">
        <p>
          Eagle Groupe traite les données personnelles des utilisateurs et des partenaires restaurants en conformité avec la <strong>Loi organique tunisienne n°2004-63 du 27 juillet 2004</strong> relative à la protection des données à caractère personnel et sous le contrôle de l'<strong>Instance Nationale de Protection des Données Personnelles (INPDP)</strong>.
        </p>
        <InfoGrid>
          <InfoField label="Autorité de contrôle" value="INPDP — inpdp.nat.tn" />
          <InfoField label="Référence légale" value="Loi n°2004-63 du 27/07/2004" />
          <InfoField label="DPO Contact" value="privacy@eagle-groupe.tn" />
          <InfoField label="Délai de réponse" value="30 jours ouvrables" />
        </InfoGrid>
        <p>
          Pour le détail complet du traitement de vos données, des permissions de localisation et des données des partenaires restaurants, consultez notre{' '}
          <a href="/legal/confidentialite" style={{ color: 'var(--gold-400)' }}>Politique de Confidentialité</a>.
        </p>
      </Section>

      <Section icon={<Mail size={16} />} title="8. Droit Applicable & Juridiction Compétente">
        <p>
          Les présentes mentions légales sont régies par le <strong>droit tunisien</strong>. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des <strong>juridictions de Tunis</strong>.
        </p>
        <p>
          Pour toute demande légale : <strong>legal@eagle-groupe.tn</strong> · <strong>eagle-groupe.tn</strong>
        </p>
      </Section>
    </LegalLayout>
  )
}
