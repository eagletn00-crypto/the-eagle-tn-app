import { FileText, Code2, Film, ShieldAlert, Gavel, Users, CreditCard, Ban, Mail } from 'lucide-react'
import LegalLayout from './LegalLayout'
import { Section, HighlightBox, InfoGrid, InfoField, BulletList, DataTable, CertificateSeal } from './LegalComponents'

export default function CGU() {
  return (
    <LegalLayout
      title="Conditions Générales d'Utilisation"
      subtitle="Régissant l'accès et l'utilisation de la plateforme premium de livraison alimentaire The Eagle TN — eagle-groupe.tn"
      lastUpdated="16 mai 2026"
      version="v2.0"
    >
      <CertificateSeal />

      <Section icon={<FileText size={16} />} title="1. Objet & Acceptation">
        <p>
          Les présentes Conditions Générales d'Utilisation (ci-après <strong>«&nbsp;CGU&nbsp;»</strong>) régissent l'accès, la navigation et l'utilisation de la plateforme numérique <strong>The Eagle TN</strong>, accessible depuis le domaine officiel <strong>eagle-groupe.tn</strong> et ses applications associées.
        </p>
        <p>
          En accédant à la plateforme, l'utilisateur déclare avoir pris connaissance intégrale des présentes CGU et les accepter sans réserve. Eagle Groupe se réserve le droit de modifier les présentes CGU à tout moment ; les modifications entrent en vigueur dès leur publication sur eagle-groupe.tn.
        </p>
        <InfoGrid>
          <InfoField label="Éditeur" value="Eagle Groupe" highlight />
          <InfoField label="Domaine officiel" value="eagle-groupe.tn" highlight />
          <InfoField label="Version des CGU" value="v2.0 — Mai 2026" />
          <InfoField label="Droit applicable" value="Droit tunisien" />
        </InfoGrid>
      </Section>

      <Section icon={<Users size={16} />} title="2. Description du Service">
        <p>
          The Eagle TN est une plateforme premium de mise en relation entre des établissements de restauration tunisiens partenaires et des consommateurs, permettant la commande et la livraison de repas à domicile ou en tout lieu désigné en Tunisie.
        </p>
        <BulletList items={[
          "Navigation et consultation du catalogue des restaurants partenaires vérifiés",
          "Passation de commandes en ligne avec paiement sécurisé en Dinars Tunisiens (DT)",
          "Suivi de l'état des commandes en temps réel",
          "Accès à un espace partenaire restaurant (tableau de bord de gestion)",
          "Expérience utilisateur premium : interface 4K, animations cinématiques, design carbone-or",
          "Service client premium disponible par email (support@eagle-groupe.tn) et téléphone",
        ]} />
      </Section>

      <Section icon={<Users size={16} />} title="3. Inscription & Compte Utilisateur">
        <p>
          L'accès aux fonctionnalités transactionnelles nécessite la création d'un compte via une adresse email valide. L'utilisateur s'engage à fournir des informations exactes, complètes et à jour, et à maintenir la confidentialité de ses identifiants.
        </p>
        <p>
          Tout compte faisant l'objet d'une utilisation abusive, frauduleuse ou contraire aux présentes CGU pourra être suspendu ou supprimé par Eagle Groupe sans préavis ni indemnité.
        </p>
      </Section>

      <Section icon={<CreditCard size={16} />} title="4. Conditions Financières & Commandes">
        <p>
          Les prix affichés sont en <strong>Dinars Tunisiens (DT)</strong>, toutes taxes comprises. La confirmation d'une commande vaut acceptation définitive et engagement de paiement.
        </p>
        <DataTable
          headers={['Élément', 'Condition']}
          rows={[
            ['Devise', 'Dinar Tunisien (DT) — TTC'],
            ['Confirmation', 'Définitive dès validation du paiement'],
            ['Réclamation commande', '48 heures après livraison'],
            ['Annulation', "Uniquement avant prise en charge par le restaurant"],
            ['Frais de livraison', 'Variables selon distance — affichés avant confirmation'],
          ]}
        />
      </Section>

      <Section icon={<Code2 size={16} />} title="5. Propriété Intellectuelle — Code Source React/Vite Protégé">
        <HighlightBox variant="gold">
          <strong>PROTECTION DU CODE SOURCE — CERTIFICAT DE DROITS D'AUTEUR DÉPOSÉS</strong>
          <br /><br />
          L'intégralité du code source de The Eagle TN, développé en <strong>React 19 + TypeScript + Vite 6</strong>, constitue une œuvre logicielle originale protégée par le droit d'auteur. Ce certificat couvre expressément :
        </HighlightBox>
        <BulletList items={[
          "Le code source React 19 complet : composants TSX, hooks personnalisés, stores Zustand, types TypeScript, fichiers de configuration Vite/TypeScript",
          "L'architecture applicative : structure des routes React Router, schéma de base de données Supabase, politiques Row Level Security (RLS), Edge Functions Deno",
          "Le système de design token propriétaire : variables CSS (--ink-*, --gold-*, --surf-*), système de spacing 8px, typographie multi-police (Playfair Display, Cormorant Garamond, Inter)",
          "L'ensemble des assets visuels : icônes SVG propriétaires, illustrations, images de marque",
          "Les textes, copies marketing, micro-textes UI et traductions françaises",
        ]} />
        <p>
          Sont <strong>expressément interdits</strong> sans autorisation écrite d'Eagle Groupe :
        </p>
        <BulletList items={[
          "Toute reproduction, copie ou décompilation du code source (inspection des sources navigateur incluse à des fins d'exploitation)",
          "Tout usage commercial des composants React, hooks, stores ou utilitaires de la plateforme",
          "La création d'œuvres dérivées basées sur l'architecture ou l'interface de The Eagle TN",
          "Le scraping, l'extraction automatisée de données ou le reverse engineering de l'API",
        ]} />
      </Section>

      <Section icon={<Film size={16} />} title="6. Protection du Système d'Animations 4K — Œuvre Audiovisuelle Déposée">
        <HighlightBox variant="gold">
          Le <strong>système d'animations cinématiques 4K de The Eagle TN</strong> constitue une œuvre audiovisuelle et logicielle originale bénéficiant d'une <strong>double protection</strong> : droit d'auteur sur le code des animations ET droit voisin sur le rendu audiovisuel.
        </HighlightBox>
        <p>Les éléments suivants font l'objet d'une protection spécifique et explicite :</p>
        <DataTable
          headers={['Élément protégé', 'Nature de la protection', 'Description']}
          rows={[
            ['SplashScreen 4K', 'Œuvre audiovisuelle + code', "Séquence complète d'animation de l'aigle : vol depuis le bas, atterrissage 3D, effet de survol ambiant"],
            ['Animations de vol 3D', 'Code source + rendu', "Paramètres de spring physics propriétaires, rotateX/rotateZ, trajectoires de translation personnalisées"],
            ['Système de particules dorées', 'Code source + rendu', 'Champ d\'étoiles, particules orbitales, rayon/taille/timing paramétrés de manière unique'],
            ['Tilt interactif 3D', 'Code source + interaction', 'useSpring + useTransform avec coefficients propriétaires pour la réactivité au pointeur'],
            ['Transitions de phase', 'Code source + rendu', 'Séquence flying → landing → settled → exit avec courbes d\'easing personnalisées'],
            ['Micro-interactions hover', 'Code source + rendu', 'Élévation, intensification du glow, expansion des particules — paramètres exclusifs'],
          ]}
        />
        <HighlightBox variant="warning">
          <strong>Interdiction expresse :</strong> toute imitation, reproduction du rendu visuel ou tentative d'extraction des paramètres d'animation par inspection des sources, outils DevTools, capture d'écran à des fins commerciales ou rétro-ingénierie expose son auteur à des poursuites civiles et pénales conformément à la législation tunisienne et aux conventions internationales.
        </HighlightBox>
      </Section>

      <Section icon={<ShieldAlert size={16} />} title="7. Limitation de Responsabilité">
        <HighlightBox variant="info">
          <strong>Clause de limitation contractuelle :</strong> Eagle Groupe agit en qualité d'intermédiaire technique entre utilisateurs et restaurants partenaires. Sa responsabilité est expressément limitée conformément aux dispositions ci-après.
        </HighlightBox>
        <p>Eagle Groupe <strong>ne saurait être tenue responsable</strong> de :</p>
        <BulletList items={[
          "La qualité, composition, conformité allergénique ou fraîcheur des produits préparés et livrés par les restaurants partenaires",
          "Les retards de livraison dus à des circonstances extérieures (conditions météorologiques, trafic, grèves, cas de force majeure)",
          "Les interruptions de service dues à des maintenances planifiées ou à des pannes d'infrastructure tierce",
          "Les dommages indirects, incluant perte de données, manque à gagner ou atteinte à l'image",
          "Tout usage frauduleux du compte utilisateur résultant d'un manquement à la confidentialité des identifiants",
        ]} />
        <p>
          La responsabilité d'Eagle Groupe est en tout état de cause <strong>limitée au montant effectivement encaissé</strong> pour la commande litigieuse.
        </p>
      </Section>

      <Section icon={<Ban size={16} />} title="8. Comportements Prohibés">
        <p>Sont strictement interdits sur la plateforme eagle-groupe.tn :</p>
        <BulletList items={[
          "Toute tentative d'accès non autorisé aux systèmes, bases de données ou comptes tiers",
          "La passation de commandes fictives, frauduleuses ou annulées de manière systématique",
          "L'utilisation de robots, scripts, crawlers ou tout dispositif automatisé non autorisé",
          "Toute tentative de décompilation, de rétro-ingénierie ou d'extraction du code source et des animations",
          "La publication de contenus illicites, diffamatoires, trompeurs ou portant atteinte aux droits des tiers",
          "Toute action susceptible de porter atteinte à l'intégrité, à la disponibilité ou à la sécurité de la plateforme",
        ]} />
      </Section>

      <Section icon={<Users size={16} />} title="9. Partenaires Restaurants — Données & Obligations INPDP">
        <p>
          Les restaurants partenaires inscrits sur eagle-groupe.tn bénéficient d'un accès à un <strong>tableau de bord de gestion dédié</strong> et acceptent les obligations suivantes :
        </p>
        <BulletList items={[
          "Exactitude et mise à jour régulière des informations du restaurant (menu, prix, disponibilité, horaires)",
          "Conformité des produits proposés aux réglementations sanitaires tunisiennes en vigueur",
          "Traitement des données clients reçues (nom, adresse de livraison, numéro de téléphone) exclusivement pour l'exécution des commandes",
          "Interdiction de réutiliser les données clients à des fins commerciales, publicitaires ou de prospection sans consentement explicite — conformément à la Loi n°2004-63 et aux directives INPDP",
          "Signalement immédiat à Eagle Groupe de toute violation de données ou incident de sécurité",
          "Conservation des données clients strictement limitée à la durée nécessaire à l'exécution et au suivi des commandes",
        ]} />
        <HighlightBox variant="gold">
          <strong>Conformité INPDP obligatoire :</strong> tout partenaire restaurant agissant en qualité de sous-traitant au sens de la Loi n°2004-63 est contractuellement tenu de traiter les données personnelles des utilisateurs en stricte conformité avec les instructions d'Eagle Groupe et les directives de l'Instance Nationale de Protection des Données Personnelles.
        </HighlightBox>
      </Section>

      <Section icon={<Gavel size={16} />} title="10. Résiliation & Droit Applicable">
        <p>
          L'utilisateur peut demander la suppression de son compte à tout moment via <strong>support@eagle-groupe.tn</strong>. La suppression entraîne la perte définitive de l'historique des commandes et des données associées.
        </p>
        <p>
          Les présentes CGU sont soumises au <strong>droit tunisien</strong>. En cas de litige, les parties s'engagent à rechercher une solution amiable dans un délai de 30 jours. À défaut d'accord, le litige sera porté devant les <strong>tribunaux compétents de Tunis</strong>.
        </p>
        <InfoGrid>
          <InfoField label="Email juridique" value="legal@eagle-groupe.tn" highlight />
          <InfoField label="Email support" value="support@eagle-groupe.tn" />
          <InfoField label="DPO / INPDP" value="privacy@eagle-groupe.tn" />
          <InfoField label="Domaine officiel" value="eagle-groupe.tn" highlight />
        </InfoGrid>
      </Section>

      <Section icon={<Mail size={16} />} title="11. Contact Légal">
        <p>
          Pour toute demande relative aux présentes CGU, aux droits de propriété intellectuelle ou à la protection des données, contactez Eagle Groupe à l'adresse <strong>legal@eagle-groupe.tn</strong> en précisant l'objet de votre demande.
        </p>
      </Section>
    </LegalLayout>
  )
}
