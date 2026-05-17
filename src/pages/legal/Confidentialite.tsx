import { Shield, Database, MapPin, Lock, Eye, UserCheck, RefreshCw, Mail } from 'lucide-react'
import LegalLayout from './LegalLayout'
import { Section, HighlightBox, InfoGrid, InfoField, BulletList, DataTable, CertificateSeal } from './LegalComponents'

export default function Confidentialite() {
  return (
    <LegalLayout
      title="Politique de Confidentialité"
      subtitle="Traitement sécurisé des données personnelles — Conformité Loi tunisienne n°2004-63 & INPDP · eagle-groupe.tn"
      lastUpdated="16 mai 2026"
      version="v2.0"
    >
      <CertificateSeal />

      <Section icon={<Shield size={16} />} title="1. Responsable du Traitement">
        <p>
          Le responsable du traitement de vos données personnelles est <strong>Eagle Groupe</strong>, domaine officiel <strong>eagle-groupe.tn</strong>.
        </p>
        <InfoGrid>
          <InfoField label="Contact DPO" value="privacy@eagle-groupe.tn" highlight />
          <InfoField label="Autorité de contrôle" value="INPDP — inpdp.nat.tn" highlight />
          <InfoField label="Référence légale" value="Loi organique n°2004-63 du 27/07/2004" />
          <InfoField label="Délai de réponse" value="30 jours ouvrables" />
        </InfoGrid>
      </Section>

      <Section icon={<Database size={16} />} title="2. Données Collectées">
        <DataTable
          headers={['Catégorie', 'Données collectées', 'Finalité', 'Base légale']}
          rows={[
            ['Identité', 'Nom, prénom, email', 'Création et gestion du compte', 'Exécution du contrat'],
            ['Contact', 'Numéro de téléphone', 'Confirmation & livraison', 'Exécution du contrat'],
            ['Localisation', 'Adresse, coordonnées GPS (consentement)', 'Livraison & restaurants disponibles', 'Consentement explicite'],
            ['Transaction', 'Historique commandes, montants', 'Facturation & service client', 'Exécution du contrat'],
            ['Navigation', 'Adresse IP, cookies de session', 'Sécurité & amélioration service', 'Intérêt légitime'],
            ['Partenaire restaurant', 'Données restaurant, menu, horaires', 'Tableau de bord partenaire', 'Exécution du contrat'],
          ]}
        />
      </Section>

      <Section icon={<MapPin size={16} />} title="3. Données de Localisation — Traitement Sécurisé & Consentement">
        <HighlightBox variant="gold">
          <strong>Permission de géolocalisation — Consentement explicite requis :</strong> la collecte de vos données de localisation est soumise à votre accord préalable. Vous pouvez révoquer cette permission à tout moment depuis les paramètres de votre navigateur ou appareil, sans que cela n'affecte les traitements antérieurs.
        </HighlightBox>
        <p>Vos données de localisation sont utilisées <strong>exclusivement</strong> pour :</p>
        <BulletList items={[
          "Identifier les restaurants partenaires disponibles dans votre zone géographique",
          "Calculer les délais et frais de livraison estimés",
          "Faciliter la saisie automatique de votre adresse de livraison",
          "Transmettre l'adresse de livraison au livreur assigné à votre commande",
        ]} />
        <HighlightBox variant="warning">
          <strong>Engagement formel :</strong> les données de localisation ne sont jamais partagées avec des tiers à des fins publicitaires, comportementales ou commerciales. Elles sont supprimées à la clôture de la session de commande.
        </HighlightBox>
      </Section>

      <Section icon={<Database size={16} />} title="4. Données des Partenaires Restaurants — Obligations INPDP">
        <p>
          Les restaurants partenaires inscrits sur eagle-groupe.tn transmettent à Eagle Groupe des données relatives à leur établissement. Ces données sont traitées dans le strict cadre de la relation contractuelle et conformément aux directives INPDP :
        </p>
        <BulletList items={[
          "Données d'identification du restaurant (nom, adresse, coordonnées, cuisine)",
          "Données opérationnelles (menus, prix, disponibilité, horaires d'ouverture)",
          "Données de performance (volume de commandes, revenus, notes — usage interne exclusif)",
          "Données du représentant légal partenaire (nom, email, téléphone — gestion du compte)",
        ]} />
        <p>
          Les partenaires agissent en qualité de <strong>sous-traitants</strong> pour les données clients qu'ils reçoivent (nom, adresse de livraison, téléphone) et sont contractuellement tenus de les traiter exclusivement pour l'exécution des commandes, conformément à la Loi n°2004-63 et aux directives de l'INPDP.
        </p>
      </Section>

      <Section icon={<Lock size={16} />} title="5. Sécurité des Données">
        <p>Eagle Groupe met en œuvre les mesures de sécurité techniques et organisationnelles suivantes :</p>
        <DataTable
          headers={['Mesure', 'Détail']}
          rows={[
            ['Chiffrement transit', 'HTTPS / TLS 1.3 — toutes les communications sont chiffrées'],
            ['Chiffrement repos', 'Données chiffrées au repos dans la base de données Supabase (PostgreSQL)'],
            ['Contrôle d\'accès', 'Row Level Security (RLS) Supabase — chaque utilisateur accède uniquement à ses données'],
            ['Authentification', 'Mots de passe hashés (bcrypt) — aucun mot de passe en clair stocké'],
            ['Sessions', 'Tokens JWT à durée limitée — renouvellement automatique sécurisé'],
            ['Journalisation', 'Audit logs des accès aux données sensibles'],
            ['Infrastructure', 'Hébergement cloud certifié avec isolation des environnements'],
          ]}
        />
      </Section>

      <Section icon={<Eye size={16} />} title="6. Durées de Conservation">
        <DataTable
          headers={['Catégorie de données', 'Durée de conservation', 'Justification']}
          rows={[
            ['Compte utilisateur actif', 'Durée de vie du compte', 'Relation contractuelle en cours'],
            ['Historique des commandes', '3 ans après la dernière commande', 'Obligation légale / litiges'],
            ['Documents comptables', '10 ans', 'Obligation légale fiscale tunisienne'],
            ['Données de localisation', 'Durée de la session de commande', 'Strictement nécessaire'],
            ['Cookies de session', 'Durée de la session navigateur', 'Fonctionnement technique'],
            ['Logs de sécurité', '1 an', 'Prévention de la fraude'],
            ['Compte supprimé', '1 an (données anonymisées)', 'Prévention de la fraude'],
          ]}
        />
      </Section>

      <Section icon={<UserCheck size={16} />} title="7. Vos Droits — Conformité Loi n°2004-63">
        <p>Conformément à la Loi organique tunisienne n°2004-63 et aux standards RGPD, vous disposez des droits suivants :</p>
        <BulletList items={[
          "Droit d'accès : obtenir une copie de vos données personnelles traitées par Eagle Groupe",
          "Droit de rectification : corriger toute donnée inexacte ou incomplète vous concernant",
          "Droit d'effacement : demander la suppression de vos données dans les conditions prévues par la loi",
          "Droit d'opposition : vous opposer au traitement de vos données pour des motifs légitimes",
          "Droit à la limitation : suspendre temporairement le traitement de vos données",
          "Droit à la portabilité : recevoir vos données dans un format structuré et lisible par machine",
          "Droit de révocation du consentement : retirer à tout moment votre consentement à la géolocalisation",
        ]} />
        <p>
          Pour exercer vos droits, adressez votre demande accompagnée d'une copie de votre pièce d'identité à <strong>privacy@eagle-groupe.tn</strong>. Délai de réponse : <strong>30 jours ouvrables</strong>.
        </p>
        <p>
          En cas de réponse insatisfaisante, vous pouvez introduire une réclamation auprès de l'<strong>Instance Nationale de Protection des Données Personnelles (INPDP)</strong> : <a href="https://www.inpdp.nat.tn" style={{ color: 'var(--gold-400)' }}>www.inpdp.nat.tn</a>.
        </p>
      </Section>

      <Section icon={<RefreshCw size={16} />} title="8. Cookies">
        <DataTable
          headers={['Type de cookie', 'Finalité', 'Durée']}
          rows={[
            ['Essentiels', 'Session de connexion, panier, préférences', 'Session / 1 an'],
            ['Analytiques', 'Mesure d\'audience anonymisée (amélioration du service)', '2 ans'],
            ['Sécurité', 'Prévention de la fraude, protection CSRF', 'Session'],
          ]}
        />
        <p>
          Vous pouvez paramétrer votre navigateur pour refuser ou supprimer les cookies. Le refus des cookies essentiels peut limiter le fonctionnement de la plateforme.
        </p>
      </Section>

      <Section icon={<Mail size={16} />} title="9. Modifications & Contact">
        <p>
          Eagle Groupe se réserve le droit de modifier la présente politique à tout moment. Les modifications importantes vous seront notifiées par email ou par un avis sur la plateforme.
        </p>
        <InfoGrid>
          <InfoField label="Contact DPO" value="privacy@eagle-groupe.tn" highlight />
          <InfoField label="INPDP Tunisie" value="www.inpdp.nat.tn" />
          <InfoField label="Domaine officiel" value="eagle-groupe.tn" highlight />
          <InfoField label="Version" value="v2.0 — Mai 2026" />
        </InfoGrid>
      </Section>
    </LegalLayout>
  )
}
